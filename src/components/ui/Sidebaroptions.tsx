'use client'
import React from 'react'
import { UserDocument } from '@/types/types'
import Link from 'next/link';
interface SidebaroptionsProps {
    role: "owner" | "editor" | "viewer",
    userID: string,
    roomId: string
}
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { User } from 'next-auth';

function Sidebaroptions({ sidebaroptions}: { sidebaroptions: SidebaroptionsProps,}) {
    // const [data, loading, error] = useDocumentData(doc(db,"documents",userID));
  const { role, userID, roomId }: SidebaroptionsProps = sidebaroptions;
  
  const [data, loading, error] = useDocumentData(doc(db,"documents", roomId));
  // console.log("Document Data:", data);
  const pathname = usePathname();
  console.log("pathname", pathname);
  const isActive = pathname.includes(roomId) && pathname !== "/";
  const isActiveClass = isActive ? "bg-gray-900" : "bg-white";
  console.log(isActiveClass);
  return (
    <div>
      <Link href={`/documents/${roomId}`}>
        <div
          className={`flex items-center p-2 gap-2 overflow-scroll hover:bg-gray-200 rounded-md ${isActiveClass} `}
        >
          <div className="flex flex-col">
            <div className="text-xs text-gray-500 ">{userID}</div>
          </div>
          <div className="ml-auto">
            <div className="text-xs text-gray-500 truncate">{data?.title ?? "Untitled"}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Sidebaroptions   
