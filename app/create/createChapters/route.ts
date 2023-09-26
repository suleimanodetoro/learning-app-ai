import { createChapterSchema } from "@/validators/course";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  // get the body of the post request
  try {
    const body = await req.json();
    const { title, units } = createChapterSchema.parse(body);
    // create output unit type
    type outputUnits = {
        title: string;
        chapters: {
            youtube_search_query: string;
            chapter_title: string;
        }


    }
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse(
        "invalid body, does not conform to schema specified",
        { status: 400 }
      );
    }
  }
  return NextResponse.json({ hello: "hello world" });
}
