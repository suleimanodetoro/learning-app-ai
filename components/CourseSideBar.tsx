import { Chapter, Course, Unit } from "@prisma/client";
import React from "react";

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const CourseSideBar = ({course}: Props) => {
  return (
    // sidebar div
    <div className="w-[400px] absolute top-1/2 -translate-y-1/2 p-6 rounded-r-3xl bg-secondary">
      <h1>{course.name}</h1>
      {
        course.units.map((unit, unitIndex)=>{
            return (
                <div key={unit.id} className="mt-4">
                    <h2>
                        Unit {unitIndex+1}
                    </h2>
                    <h2 className="text-2xl font-bold">{unit.name}</h2>


                </div>
            )
        })
      }
    </div>
  );
};

export default CourseSideBar;
