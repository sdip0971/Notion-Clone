'use client';
import React, { createContext, useContext } from 'react';
import { createDocument } from '@/actions/newdocument';
import { redirect, RedirectType } from 'next/navigation';
import { getSession } from 'next-auth/react';

interface CreatedocumentContextType {
createdocument: () => void;
errormsg: string;
isPending: boolean;
}
import { Session } from 'next-auth';
import { UserDocument } from '@/types/types';
import { useRouter } from 'next/router';
export const createdocumentontext = createContext<CreatedocumentContextType | undefined>(undefined);

export const CreatedocumentProvider = ({ children }: { children: React.ReactNode }) => {
const [errormsg, setErrorMsg] = React.useState("");
const [isPending, startTransition] = React.useTransition();

const createdocument = () => {
try {
    const router = useRouter();
startTransition(async () => {
  const session: Session | null = await getSession() 
     console.log(session)
     if (!session || !session.user) {
        throw new Error("User is not authenticated");
    }
 
    const userid = session.user.id;
    if (!userid) {
        throw new Error("User ID is not defined");
    }
const { DocumentId } = await createDocument(userid);
if(!DocumentId) {
    throw new Error("Document ID is not defined");
}
redirect(`document/${DocumentId}`)
});
}
catch (error: any) {
        console.error("Error in createdocument:", error);
        setErrorMsg(error.message || "An unexpected error occurred");
}
};

return (
<createdocumentontext.Provider value={{ createdocument, errormsg, isPending }}>
{children}
</createdocumentontext.Provider>
);
};

const useCreatedocument = () => {
const context = useContext(createdocumentontext);
if (context === undefined) {
throw new Error('useCreatedocument must be used within a CreatedocumentProvider');
}
return context;
};

export { useCreatedocument }; 