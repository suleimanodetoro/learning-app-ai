import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

const bodyParser = z.object({
    chapterId: z.string()
})
export async function POST(req:Request, res: Response){
    try {
        const body = await req.json();
        const {chapterId} = bodyParser.parse(body)

        const chapter = prisma.chapter.findUnique({
            where: {
                id: chapterId
            },

        });
        if (!chapter) {
            return NextResponse.json({success:false, error:"Chapter not found"}, {status:404})
            
        }
        
        
    } catch (error) {
        if(error instanceof ZodError ){
            return NextResponse.json({success:false, error:"Invalid Body Structure"}, {status: 400})
        }   else {
            return NextResponse.json({success: false,error:"unknown"}, {status:500})
        }     
    }
}