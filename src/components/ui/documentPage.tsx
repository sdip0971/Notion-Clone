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
    userId : z.string().min(1, { message: "User ID is required" }),
    content: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

function DocumentPage({ documentid }: { documentid: string }) {
    const user = userstore((state) => state.user);
    const [data, loading, error] = useDocumentData(doc(db,"documents", documentid));
    const rawdata = data as UserDocument;
    useEffect(() => {

      if(!data) return;
      try{
      const validate = documentvalidation.safeParse(rawdata);
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
 
    


const [input, setInput] = useState(data?.title || "");
let lastref = useRef("");

const handletitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
  const newtitle = e.target.value;
  setInput(newtitle);

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
    <div className="flex flex-col flex-1 min-h-screen mt-8 ml-15   h-screen">
      <div className="flex flex-col w-[60vw] ">

        <Input
          value={input}
          onChange={handletitleChange}
          type="text"
          placeholder={data?data.title:"Enter Document Title"}
          className={`border-none text-gray-800 shadow-none text-2xl !text-2xl placeholder:text-2xl bg-transparent focus:outline-none focus:border-none ${data}.title ? "text-gray-900" : "text-gray-400"`}
          onBlur={handleFocusChange}
        />
      </div>
      Document Page : {documentid}
    </div>
  );
}

export default DocumentPage
