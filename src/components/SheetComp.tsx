'use client'
import React, { useEffect, useState, useTransition } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { roomDocument } from "@/types/types";
import { userstore } from "@/components/context/userstore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NotebookIcon } from "lucide-react";
import { useCreatedocument } from "./context/newdocumentprovider";

function SheetComp() {
  const [isPending, startTransition] = useTransition();
  const { createdocument } = useCreatedocument();
  const [groupeddata, setGroupedData] = useState<{owner:roomDocument[],editor:roomDocument[]}>({
    owner: [],
    editor: [],
  })
  const user = userstore((state) => state.user);
  const [data, loading, error] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("userID", "==", user.id))
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    const grouped = data.docs.reduce<{
      owner: roomDocument[];
      editor: roomDocument[];
    }>(
      (acc, curr) => {
        const roomdata = curr.data() as roomDocument; // Ensure roomdata is typed correctly
        if (roomdata.role === "owner") {
          acc.owner.push(roomdata);
        } else if (roomdata.role === "editor") {
          acc.editor.push(roomdata);
        }
        return acc;
      },
      { owner: [], editor: [] }
    )
  }, [data]);

  return (
    <div>
      <Sheet>
        <SheetTrigger className="mr-3 m-3 md:hidden">
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="#4A5568"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="flex text-[rgb(82,82,82)] text-3xl justify-center">
              Notion
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-row gap-2 text-nowrap p-4 mt-4 mr-4">
            <NotebookIcon />
            <h1 className="" onClick={createdocument}>
              New Document
            </h1>

          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SheetComp;
