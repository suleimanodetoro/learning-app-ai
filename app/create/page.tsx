import CreateCourseForm from "@/components/CreateCourseForm";
import { getAuthSession } from "@/lib/auth";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const CreatePage = async ({}: Props) => {
  const session = await getAuthSession();
  // if use isn't logged in, redirect to gallery
  if (!session?.user) {
    return redirect("/gallery");
  }

  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
        Learning Journey
      </h1>
      <div className="flex p-5 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
        <div>
          Enter in a topic, or what you want to learn about. Then enter a list
          of subtopics which are the specific areas you want to learn about, and
          our AI will generate a course for you!
        </div>
      </div>

      <CreateCourseForm />
    </div>
  );
};

export default CreatePage;
