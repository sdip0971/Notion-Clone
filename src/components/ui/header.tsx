"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import UserProfile from "./UserProfile";

export const Header = () => {
  const session = useSession();
  const { data } = session;



  // Destructure user only if data and data.user are defined
  const user = data?.user;

  return (
    <>
      <div className="flex mt-2 items-center justify-between">
        <div className="flex w-screen flex-col-2 justify-between items-center gap-2">
          {user ? (
            <div className="text-2xl pl-3 pr-3 text-black">
              {user.name?.toLocaleUpperCase()}'s Space
            </div>
          ) : (
            <div className=" text-[rgb(82,82,82)] text-3xl  pl-3 pr-3 font-bold">
              Notion
            </div>
          )}
          {user ? (
            <UserProfile user={user} />
          ) : (
            <Button
              onClick={() => signIn()}
              className="text-gray-100 text-sm bg-black mr-3"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
