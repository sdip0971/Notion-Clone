'use client'
import React, { use, useEffect } from 'react'
import { updateDocumenttitle } from '@/utils/updatedocument';
import { useRef,useState } from 'react';
import { Input } from "@/components/ui/input";
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import { collectionGroup,collection, query, where, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { z } from 'zod';
import { userstore } from '../context/userstore';
import { validate } from 'uuid';
import { UserDocument } from '@/types/types';
const documentvalidation  = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    userID : z.string(),
    content: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });
import { useMyPresence, useOthers } from "@liveblocks/react";
function DocumentPage({ documentid }: { documentid: string }) {
    const user = userstore((state) => state.user);
    const [data, loading, error] = useDocumentData(doc(db,"documents", documentid));

    const [input, setInput] = useState("");
    let lastref = useRef("");


  
    useEffect(() => {

      if(!data) return;
      if(data?.title){
        setInput(data.title)
      }
      const normalized = {
        ...data,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : data.createdAt,
        updatedAt: data.updatedAt?.toDate
          ? data.updatedAt.toDate()
          : data.updatedAt,
      };
      try{
      const validate = documentvalidation.safeParse(normalized);
      console.log(validate)
      if (!validate.success) {
        console.error("Document data is invalid", validate.error.format());
        return;
      }
     
      }
      catch (error) {
        console.error("Document data is invalid", error);
      }
    },[data])
 
    



const handletitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
  const newtitle = e.target.value;
  setInput(newtitle);
  updateDocumenttitle(newtitle, documentid);

};
const handleFocusChange = (e: React.FocusEvent<HTMLInputElement>) => {
  e.preventDefault();
  const newtitle = e.target.value;
  setInput(newtitle);
  if (lastref.current !== newtitle) {
    lastref.current = newtitle;
    updateDocumenttitle(newtitle, documentid);
  }
};
if (!user) return <div>Loading user...</div>;
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
if (!data) return <div>No data found</div>;
console.log(data.title)

  return (
    <>
      <div className="flex flex-col flex-1 min-h-screen mt-8 ml-15   h-screen">
        <div className="flex flex-col w-[60vw] ">
          <Input
            value={input}
            onChange={handletitleChange}
            type="text"
            placeholder={data ? "" : "Enter Document Title"}
            className={`border-none shadow-none text-2xl !text-2xl placeholder:text-2xl bg-transparent focus:outline-none focus:border-none ${
              data.title ? "text-black font-bold" : "text-gray-800"
            }`}
            onBlur={handleFocusChange}
          />
        </div>
        <div className='mr-3 pl-3 pt-3'>
          <h1 className="">Document Page : {documentid}</h1>
        </div>
      </div>
    </>
  );
}

export default DocumentPage
