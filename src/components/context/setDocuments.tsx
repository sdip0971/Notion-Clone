import { useEffect } from "react";
import { userstore } from "./userstore";
import { db } from "@/firebase";
import { query, collectionGroup, where, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { editorstore } from "./editorstore";
import { UserDocument } from "@/types/types";

export function useSetDocuments() {
  const user = userstore((state) => state.user);
  const setDocumentData = editorstore((state) => state.setDocumentData);
  const documentquery = user
    ? query(collection(db, "documents"), where("userID", "==", user.id))
    : null;
  const [data, loading, error] = useCollection(documentquery);

  useEffect(() => {
    if (!user || !data) {
      setDocumentData([]);
      return;
    }
    setDocumentData(data.docs.map((doc) => doc.data() as UserDocument));
  }, [user, data, setDocumentData]);
}
