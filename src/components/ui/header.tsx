
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import UserProfile from "./UserProfile";
import { ShimmerSectionHeader } from "react-shimmer-effects";
import { userstore } from "../context/userstore";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeaderClient from "./HeaderClient";
import type { Session } from "next-auth";
export const Header = async() => {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <HeaderClient session={session} />
  )
};
