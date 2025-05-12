import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { debounce, update } from "lodash";
const updatetitle = async (docref: any, title: string) => {
  const update = await updateDoc(docref, {
    title: title,
    updatedAt: new Date(),
  });
};
export const updateDocumenttitle = debounce((title: string,docId:string) => {
    const docref = doc(db, "documents", docId);
    console.log("🔥 docId type:", typeof docId, "value:", docId);
    updatetitle(docref, title);
}, 1000);
