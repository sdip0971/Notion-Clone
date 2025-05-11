"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import UserProfile from "./UserProfile";
import { ShimmerSectionHeader } from "react-shimmer-effects";
import { userstore } from "../context/userstore";

export const Header = () => {
  const user = userstore((state) => state.user);
  const isLoggedIn = userstore((state) => state.isLoggedIn);
  const initialized = userstore((state) => state.initialized);

  

  if (!initialized) {
    return (
      <div>
        <ShimmerSectionHeader />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex mt-2 items-center justify-between">
      <div className="flex w-full flex-col-2 justify-between items-center gap-2">
        {isLoggedIn && user ? (
          <>
            <div className="text-2xl pl-3 pr-3 text-black">
              {user?.name?.toLocaleUpperCase()}'s Space
            </div>
            <UserProfile user={user} />
          </>
        ) : (
          <>
            <div className="text-[rgb(82,82,82)] text-3xl pl-3 pr-3 font-bold">
              Notion
            </div>
            <Button
              onClick={() => signIn()}
              className="text-gray-100 text-sm bg-black mr-3"
            >
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
