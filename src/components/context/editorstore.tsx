import { create } from "zustand";
import { UserDocument } from "@/types/types";

type EditorState = {
  documents: UserDocument[];
  setDocumentData: (documentdata: UserDocument[]) => void;
};

export const editorstore = create<EditorState>((set) => ({
  documents: [],
  setDocumentData: (documentdata) => set({ documents: documentdata }),
}));
