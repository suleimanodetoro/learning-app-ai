import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import {
  SearchYoutube,
  getQuestionsFromTranscript,
  getTranscript,
} from "@/lib/youtube";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

const bodyParser = z.object({
  chapterId: z.string(),
});
const MAX_TRANSCRIPT_LENGTH = 300; // Maximum transcript length

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { chapterId } = bodyParser.parse(body);
    const chapter = await prisma.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });
    if (!chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "Chapter not found",
        },
        { status: 404 }
      );
    }
    // get videoId
    const videoId = await SearchYoutube(chapter.youtubeSearchQuery);
    let transcript = await getTranscript(videoId);
    // Limit transcript length to MAX_TRANSCRIPT_LENGTH
    transcript= transcript.split(' ').splice(0, MAX_TRANSCRIPT_LENGTH).join(' ')
    // get summary with ai
    const { summary }: { summary: string } = await strict_output(
        "You are an AI capable of summarizing a youtube transcript",
        `Generate a summary of the main points in the transcript. Keep it concise and relevant, without mentioning sponsors or unrelated content. \n` +
          transcript,
        {
          summary: "summary of the transcript",
        }
      );

    const questions = await getQuestionsFromTranscript(
      transcript,
      chapter.name
    );

    await prisma.question.createMany({
      data: questions.map((question) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          chapterId: chapterId,
        };
      }),
    });

    await prisma.chapter.update({
        where: { id: chapterId },
        data: {
          videoId: videoId,
          summary: summary,
        },
      });

    return NextResponse.json({
      success: true});
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid Body Structure" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "unknown" },
        { status: 500 }
      );
    }
  }
}
