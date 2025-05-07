'use client'
import React, { useActionState, useContext } from 'react'
import { useAction } from "next-safe-action/hooks";
import { createDocument } from '@/actions/newdocument';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;
import {
  NotebookIcon,
} from "lucide-react";
import { Button } from './ui/button';


import { redirect } from 'next/navigation';
import { Session } from 'next-auth'; 
import { useTransition } from 'react'; 
import { start } from 'repl';


import next, { NextApiRequest,NextApiResponse } from 'next';
import { useCreatedocument } from './context/newdocumentprovider';
function SheetComp() {
  const [errormsg, setErrorMsg] = React.useState("");
  const [isPending, startTransition] = useTransition();
  const { createdocument } = useCreatedocument()
  
  return (
    <div>
      <Sheet>
        <SheetTrigger className="mr-3 m-3 md:hidden"><svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="#4A5568" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg></SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="flex text-[rgb(82,82,82)] text-3xl justify-center">
              Notion
            </SheetTitle>
          </SheetHeader>
          <div className='flex flex-row text-nowrap mt-4 mr-4'>
            <NotebookIcon/>
            <Button onClick={createdocument}>New Document</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SheetComp
