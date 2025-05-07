"use server"
import { collection, addDoc, getFirestore, documentId } from "firebase/firestore"; // Client SDK
import { db } from "@/firebase";
import { Session, User } from "next-auth";

import { getAdminDb } from "@/firebase-admin";
import { getSession } from "next-auth/react";
import { title } from "process";
import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import { UserDocument } from "@/types/types";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
type userid = string | undefined;
export async function  createDocument(userid:string): Promise<{DocumentId: string}> {
    if (!userid) {
      throw new Error("User ID is not defined");
    }
    // Get the client Firestore instance
    const admindb = getAdminDb(); // Admin SDK Firestore instance
    if (!admindb) {
      throw new Error("Failed to initialize Firestore Admin SDK");
    }
   
    const doccollectionref = await admindb.collection("documents");
    const docref  = await doccollectionref.add({
      userID: userid,
      title: "Untitled",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    
    });
    return { DocumentId: docref.id}; 
}

