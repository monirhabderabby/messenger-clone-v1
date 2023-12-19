import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaDB from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { name, image } = body;

    if (!currentUser) {
      return new NextResponse("unAthorized", { status: 401 });
    }

    const updateUser = await prismaDB.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updateUser, { status: 200 });
  } catch (error: any) {
    console.log("[SETTING_POST_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
