"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext } from "react";
import { createDocument } from "@/actions/newdocument";

import { useSession } from "next-auth/react";

interface CreatedocumentContextType {
  createdocument: () => void;
  errormsg: string;
  isPending: boolean;
}

export const createdocumentontext = createContext<
  CreatedocumentContextType | undefined
>(undefined);

export const CreatedocumentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const router = useRouter();
  const [errormsg, setErrorMsg] = React.useState("");
  const [isPending, startTransition] = React.useTransition();

  const { data: session } = useSession();

  const createdocument = () => {
    startTransition(async () => {
      try {
        if (!session || !session.user) {
          throw new Error("User is not authenticated");
        }

        const userid = session.user.id;
        if (!userid) {
          throw new Error("User ID is not defined");
        }

        const { DocumentId } = await createDocument(userid);
        if (!DocumentId) {
          throw new Error("Document ID is not defined");
        }


        router.push(`/document/${DocumentId}`);
      } catch (error: any) {
        console.error("Error in createdocument:", error);
        setErrorMsg(error.message || "An unexpected error occurred");
      }
    });
  };

  return (
    <createdocumentontext.Provider
      value={{ createdocument, errormsg, isPending }}
    >
      {children}
    </createdocumentontext.Provider>
  );
};

const useCreatedocument = () => {
  const context = useContext(createdocumentontext);
  if (context === undefined) {
    throw new Error(
      "useCreatedocument must be used within a CreatedocumentProvider"
    );
  }
  return context;
};

export { useCreatedocument };
