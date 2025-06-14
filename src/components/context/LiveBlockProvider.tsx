"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import React from "react";

function LiveBlockProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error("Your LiveBlock Key is not valid");
  }
  return (
    <LiveblocksProvider throttle={16}
      
      authEndpoint={"/api/liveblock-auth"}
    >
      <div>{children}</div>
    </LiveblocksProvider>
  );
}

export default LiveBlockProvider;
