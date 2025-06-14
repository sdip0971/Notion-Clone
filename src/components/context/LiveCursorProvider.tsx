"use client"
import { useOthers, useMyPresence } from '@liveblocks/react/suspense';
import React from 'react';
import FollowPointer from './FollowPointer';

function LiveCursorProvider({ children }: { children: React.ReactNode }) {
    const [myPresence, updateMyPresence] = useMyPresence();
    const others = useOthers();

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        updateMyPresence({
            cursor: {
                x: Math.floor(e.pageX),
                y: Math.floor(e.pageY),
            },
        });
    };

    const handlePointerLeave = () => {
        updateMyPresence({
            cursor:null
        })
    };

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            {children}
            {others
                .filter((other) => other.presence.cursor !== null)
                .map((other) => (
                    <FollowPointer
                        key={other.connectionId}
                        connectionId={other.connectionId}
                        info={other.info}
                        x={other.presence?.cursor?.x}
                        y={other.presence?.cursor?.y}
                    />
                ))
            }
        </div>
    );
}

export default LiveCursorProvider;