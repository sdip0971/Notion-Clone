'use client';
import React from "react";
import DocumentPage from "@/components/ui/documentPage";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";


export default function Page() {
  const params = useParams();
  const rawDocumentId = params?.documentid;
  const documentid = Array.isArray(rawDocumentId) ? rawDocumentId[0] : rawDocumentId;

  if (!documentid) {
    return <div>Error: Document ID is missing!</div>;
  }
 
  return <DocumentPage documentid={documentid} />;
}
