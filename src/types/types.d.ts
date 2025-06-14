
 declare module "next-auth" {
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        sub?: string | null;
    }
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            sub?: string | null;
        };
    }
}
export interface UserDocument {
  id: string;
  userID: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

}
export interface roomDocument {
  id: string;
  userID: string;
  role: "owner" | "editor" | "viewer";
  createdAt: Date;
  roomId: string;
}
export type DocumnetId = string | undefined;