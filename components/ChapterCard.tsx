"use client";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { error } from "console";
import React, { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

type Props = {
  chapter: Chapter;
  chapterIndex: number;
  completedChapters: Set<String>;
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
};

export type ChapterCardHandler = {
  triggerLoad: () => void;
};

// use React.fowardRef ref to enable us pass refs to custom components
const ChapterCard = React.forwardRef<ChapterCardHandler, Props>(
  ({ chapter, chapterIndex, completedChapters, setCompletedChapters }, ref) => {
    const { toast } = useToast();
    const [success, setSuccess] = useState<boolean | null>(null);
    const { mutate: getChapterInfo, isLoading } = useMutation({
      mutationFn: async () => {
        const response = await axios.post("/api/chapter/getInfo", {
          chapterId: chapter.id,
        });
        return response.data;
      },
    });

    const addChapterIdToSet = React.useCallback(() => {
      setCompletedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      });
    }, [chapter.id, setCompletedChapters]);

    // if the user has not clicked the generate button, but some have already been generated in a past call, turn the chapter cards green
    React.useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true);
        addChapterIdToSet();
      }
    }, [chapter, addChapterIdToSet]);

    React.useImperativeHandle(ref, () => ({
      async triggerLoad() {
        // If we have already processed a request for a chapter, add it to completed chapters
        if (chapter.videoId) {
          addChapterIdToSet();
          return;
        }
        getChapterInfo(undefined, {
          // destructure "success" from route
          onSuccess: () => {
            addChapterIdToSet();
            setSuccess(true);
          },
          onError: (error) => {
            console.log(error);
            setSuccess(false);
            toast({
              title: "Error",
              description: "Error loading chapter. When all requests are done, refresh the page and try again",
              variant: "destructive",
            });
            addChapterIdToSet();

          },
        });
      },
    }));

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
        {isLoading && <Loader2 className="animate-spin" />}
      </div>
    );
  }
);

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;
