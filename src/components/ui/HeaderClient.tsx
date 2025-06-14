"use client"
import React from 'react'

import { signIn } from 'next-auth/react';
import UserProfile from './UserProfile';
import { ShimmerSectionHeader } from 'react-shimmer-effects';
import { userstore } from '../context/userstore';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { Button } from './button';
import type { Session } from 'next-auth';
function HeaderClient({session}:{session:Session | null}) {
    const user = session?.user || null;

    return (
      <div className=" mt-2 ml-64 items-center justify-between">
        <div className=" relative flex  flex-row justify-between items-center gap-2">
          {user ? (
            <>
              <div className="text-2xl pl-3 pr-3 text-black">
                {user?.name?.toLocaleUpperCase()}'s Space
              </div>
              <UserProfile user={user} />
            </>
          ) : (
            <>
              <div className=" absolute left-1/2 transform -translate-x-1/2 text-[rgb(82,82,82)] text-3xl pl-3 pr-3 font-bold">
                <p> Welcome</p>
              </div>
              <Button
                onClick={() => signIn()}
                className="ml-auto text-gray-100 text-sm bg-black mr-10  "
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    );
}

export default HeaderClient
