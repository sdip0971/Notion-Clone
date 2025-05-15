
import React from "react";
import DocumentPage from "@/components/ui/documentPage";

export const dynamic = "force-dynamic";

export default function Page({ params }: { params: { documentid: string } }) {
  // Ensure `documentid` is defined
  if (!params || !params.documentid) {
    return <div>Error: Document ID is missing!</div>;
  }

  const documentid = params.documentid;

  return <DocumentPage documentid={documentid} />;
}