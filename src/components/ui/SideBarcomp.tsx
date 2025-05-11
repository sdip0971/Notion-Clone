'use client'
import React, { useContext, useEffect, useState, useTransition } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,

  
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Calendar, Home, Inbox, Search, Settings,NotebookIcon} from "lucide-react";
import { Button } from './button';
import { useCreatedocument } from '../context/newdocumentprovider';
import { db } from '@/firebase';
import { roomDocument } from '@/types/types';
import { query, collectionGroup, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { userstore } from '../context/userstore';
import { Query } from 'firebase-admin/firestore';
const items = [
  {
    title: "New Document",
    url: "#",
    icon: NotebookIcon,
  },
   
];


function SideBarcomp() {
  const { createdocument } = useCreatedocument();
  const [isPending, startTransition] = useTransition();
  const [groupeddata, setGroupedData] = useState<{
    owner: roomDocument[];
    editor: roomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  const user = userstore((state) => state.user);
  const [isUserFetched, setIsUserFetched] = useState(false);
  console.log("User:", user);

  // Track when the user is fetched
  const queryRef = user
    ? query(collectionGroup(db, "rooms"), where("userID", "==", user.id))
    : null;


  const [data, loading, error] = useCollection(queryRef);
  console.log("User:", user);
  console.log("QueryRef:", queryRef);
  console.log("Data:", data);


  useEffect(() => {
    if (!data) {
      return;
    }

    const grouped = data.docs.reduce<{
      owner: roomDocument[];
      editor: roomDocument[];
    }>(
      (acc, curr) => {
        const roomdata = curr.data() as roomDocument;
        console.log("Room Data:", roomdata); // Log the room data
        // Ensure roomdata is typed correctly
        if (roomdata.role === "owner") {
          acc.owner.push(roomdata);
        } else if (roomdata.role === "editor") {
          acc.editor.push(roomdata);
        }
        return acc;
      },
      { owner: [], editor: [] }
    );
    setGroupedData(grouped);
  }, [data]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-gray-200"
          viewBox="3 3 18 18"
        ></svg>
        <p className="text-gray-500">Loading user...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-gray-200"
          viewBox="3 3 18 18"
        ></svg>
        <p className="text-gray-500">Fetching documents...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error loading documents: {error.message}</div>;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl justify-center">
            Notion
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <div>
                      <item.icon />
                      <button
                        onClick={createdocument}
                        className="cursor-pointer"
                      >
                        {item.title}
                      </button>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div>My Documents</div>
              {groupeddata.owner.map((item) => (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <div>{item.roomId}</div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default SideBarcomp
