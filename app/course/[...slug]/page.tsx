import CourseSideBar from '@/components/CourseSideBar'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params:{
        slug: string[]
    }
}

const CoursePage = async ({params:{slug}}: Props) => {
    // destructure items from slug
    const [courseId, unitIndexParam, chapterIndexParam] = slug;
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
          units: {
            include: {
              chapters: {
                include: { questions: true },
              },
            },
          },
        },
      });

    if (!course) {
        return redirect('/gallery')
        
    }

    let unitIndex = parseInt(unitIndexParam);
    let chapterIndex = parseInt(chapterIndexParam)

    // get unit at certain index
    const unit = course.units[unitIndex];
  if (!unit) {
    return redirect("/gallery");
  }
//   get chapter at certain index
  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    return redirect("/gallery");
  }
  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];

  return (
    <CourseSideBar course={course} currentChapterId={chapter.id} />
  )
}
export default CoursePage;