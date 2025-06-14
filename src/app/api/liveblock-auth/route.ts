import { getAdminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblock";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";
import redirect from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(req: Request) {
  const session = (await getServerSession(authOptions)) as Session | null;

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });

  }

  const user = session.user;


  const body = await req.json();
  const roomId = body.room;

  const userId = user.id;

  const liveblockSession = liveblocks.prepareSession(user.email!, {
    userInfo: {
      name: user.name || "Anonymous",
      email: user.email || "",
      avatar: user.image!,
    },
  });

  try {
  
    const userRoomsRef = getAdminDb()
      .collection("users")
      .doc(userId)
      .collection("rooms")
      .doc(roomId);
      

    const userRoomDoc = await userRoomsRef.get();

    if (userRoomDoc.exists) {
      liveblockSession.allow(roomId, liveblockSession.FULL_ACCESS);
      const { status, body } = await liveblockSession.authorize();
      return new Response(body, {
        status,
        headers: { "Content-Type": "application/json" },
      });
      
    } 
    else {
      return new Response(
        JSON.stringify({ message: "You are not in the Room" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (err) {
    console.error("Firestore Query Failed:", err);
    return new Response(JSON.stringify({ error: "Firestore query failed." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
