"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { userstore } from "@/components/context/userstore";
import { User } from "next-auth";

function UserAcc() {
  const { data: session, status } = useSession();
  const user: User | undefined = session?.user;

  const setUser = userstore((state) => state.setUser);

  useEffect(() => {
    if (status === "authenticated" && userstore.getState().user !== user) {

      setUser(user || null);
    }
    else if (status === "unauthenticated") {

      setUser(null);
    }
  }, [user, status, setUser]);

  return null;
}

export default UserAcc;
