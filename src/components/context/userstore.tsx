import { create } from "zustand";
import { User } from "next-auth";

type UserState = {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  initialized : boolean;
};

export const userstore  = create<UserState>((set) => ({ 
    user:null,
    isLoggedIn:false,
    loading:true,
    initialized:false,
     setUser: (user) => set({ user, isLoggedIn :!!user, loading:false, initialized:true}),

  })); 