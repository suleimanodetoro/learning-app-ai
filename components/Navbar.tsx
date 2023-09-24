import React from "react";
import Link from "next/link";
import SignInButton from "./SignInButton";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  console.log(session);

  return (
    <nav className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-center h-full gap-2 px-8 mx-auto sm:justify-between max-w-7xl">
        {/* logo. hidden on small screens, shown and larger screens */}
        <Link href={"/gallery"} className="items-center hidden gap-2 sm:flex">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            Learning.AI
          </p>
        </Link>
        <div className="flex items-center">
          {/* Gallery page: Show courses user has created */}
          <Link href={"/gallert"} className="mr-3 hover:-translate-y-[2px]">
            Gallery
          </Link>
          {/* Only show create course and settings if the user is signed in */}
          {session?.user && (
            <>
              {/* create course link */}
              <Link href={"/create"} className="mr-3 hover:-translate-y-[2px]">
                Create course
              </Link>

              {/* Setting page link */}
              <Link
                href={"/settings"}
                className="mr-3 hover:-translate-y-[2px]"
              >
                Settings
              </Link>
            </>
          )}
          {/* Only render sign in button if user is not signed in */}
          <div className="flex items-center">
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
