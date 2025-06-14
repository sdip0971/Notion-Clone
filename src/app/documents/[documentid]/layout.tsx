'use client'
import { userstore } from '@/components/context/userstore'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useParams, useRouter } from "next/navigation";
import RoomProviderWrapper from "@/components/context/RoomProvider";

function layout({children}:Readonly<{children : React.ReactNode}>) {
    const session = useSession()
    const router = useRouter()
    if (!session){
        router.push("/login")
    }
      const params = useParams();
      const rawDocumentId = params?.documentid;
    const documentid = Array.isArray(rawDocumentId) ? rawDocumentId[0] : rawDocumentId;
    console.log("Document ID:", documentid);

  return (
    <RoomProviderWrapper roomid={documentid!}>
      {children}  
    </RoomProviderWrapper>
  )
}
 
export default layout
 