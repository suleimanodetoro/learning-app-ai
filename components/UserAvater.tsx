import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { User } from "next-auth";
import Image from "next/image";

type Props = {
  user: User;
};

function UserAvater({ user }: Props) {
  return (
    <Avatar>
      {/* If user image is available, show it, else show default avatar */}
      {user?.image ? (
        <div className="relative h-full w-full aspect-square">
          <Image
            fill
            src={user.image}
            alt="user profile avatar"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback className="sr-only">{user.name}</AvatarFallback>
      )}
    </Avatar>
  );
}

export default UserAvater;
