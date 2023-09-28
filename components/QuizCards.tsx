"use client"

import { cn } from "@/lib/utils";
import { Chapter, Question } from "@prisma/client";
import React from "react";
// import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

type Props = {
  chapter: Chapter & {
    questions: Question[];
  };
};
const QuizCards = (props: Props) => {
  return (
    <div>QuizCards</div>
  )
}

export default QuizCards