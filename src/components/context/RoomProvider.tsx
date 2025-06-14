"use client";
import React from 'react';
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";
import LoadingSpinner from '../ui/LoadingSpinner';
import LiveCursorProvider from './LiveCursorProvider';
function RoomProviderWrapper({ roomid, children }: { roomid: string; children: React.ReactNode }) {
  return (
    <RoomProvider id={roomid} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <LiveCursorProvider>{children}</LiveCursorProvider>
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default RoomProviderWrapper;