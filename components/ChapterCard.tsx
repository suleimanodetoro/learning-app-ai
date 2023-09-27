"use client";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

type Props = {
  chapter: Chapter;
  chapterIndex: number;
};

export type ChapterCardHandler = {
    triggerLoad: ()=> void;
};

// use React.foward ref to enable us pass refs to custom components
const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(({ chapter, chapterIndex },ref) => {
    React.useImperativeHandle(ref, () =>({
        async triggerLoad() {
            getChapterInfo(undefined, {
                onSuccess:()=>{
                    console.log("success");
                    
                }
            })
            
        }
    }))
  const [success, setSuccess] = useState<boolean | null>(null);

  const { mutate: getChapterInfo, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/chapter/getInfo",{chapterId: chapter.id});
      return response.data;
    },
  });
  return (
    <div
      className={cn("px-4 py-2 m-2 flex justify-between ", {
        "bg-secondary": success === null,
        "bg-red-500": success === false,
        "bg-green-500": success === true,
      })}
      key={chapter.id}
    >
      <h5>{chapter.name}</h5>
    </div>
  );
});

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;
