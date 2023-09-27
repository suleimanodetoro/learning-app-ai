"use client";
import { Chapter, Course, Unit } from "@prisma/client";
import React from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ChapterCard, { ChapterCardHandler } from "./ChapterCard";

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const ConfirmChapters = ({ course }: Props) => {
  // we'll use refs to instruct each chapter card to call api individually instead of calling by chapter one by one
  const chapterRefs: Record<string, React.RefObject<ChapterCardHandler>> = {};
  // map chapters to refs
  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      chapterRefs[chapter.id] = React.useRef(null);
    });
  });
  console.log(chapterRefs);

  return (
    <div className="w-full mt-4">
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-5">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Unit {unitIndex + 1}
            </h2>
            <h3 className="text-2xl font-bold">{unit.name}</h3>
            <div className="mt-3">
              {unit.chapters.map((chapter, chapterIndex) => {
                return (
                  <ChapterCard
                    key={chapter.id}
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                    ref={chapterRefs[chapter.id]}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      {/* div for buttons */}
      <div className="flex items-center justify-center m4">
        <Separator className="flex-[1]" />
        <div className="flex items-center mx-4">
          <Link
            href={"/create"}
            className={buttonVariants({ variant: "secondary" })}
          >
            <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={4} />
            Go back
          </Link>
          <Button
            type="button"
            className="ml-4 font-semibold"
            onClick={() => {
              Object.values(chapterRefs).forEach((ref) => {
                ref.current?.triggerLoad();
              });
            }}
          >
            Generate
            <ChevronRight className="w-4 h-4 ml-2" strokeWidth={4} />
          </Button>
        </div>
        <Separator className="flex-[1]" />
      </div>
    </div>
  );
};

export default ConfirmChapters;
