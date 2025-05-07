'use client'
import React, { useContext } from 'react'
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
const items = [
  {
    title: "New Document",
    url: "#",
    icon: NotebookIcon,
  },
];

function SideBarcomp() {
  const {createdocument} = useCreatedocument()

  
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
                    <div className="flex items-center gap-2">
                      <item.icon />
                      <h1  onClick={createdocument} className='cursor-pointer'>{item.title}</h1>
                    </div>
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
