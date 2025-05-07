import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

interface UserProfileProps {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

export default function UserProfile({ user }: UserProfileProps) {

    return (
      <div className="mr-6 ">
        <DropdownMenu>
          <DropdownMenuTrigger className="h-10 w-10 rounded-[100%] overflow-hidden p-0 border-0 flex items-center justify-center">
            <img 
                className="min-h-full min-w-full object-cover" 
                src={user?.image || undefined} 
                alt="" 
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
                <div className="font-medium">
                    {user?.name}'s Notion
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem> <Button  onClick={() => signOut()} className="w-full text-gray-100 text-sm bg-black mr-3">Log Out</Button></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
}
