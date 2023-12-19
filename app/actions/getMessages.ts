import prismaDB from "@/app/lib/prismadb";

const getMessages = async (conversationId: string) => {
  try {
    const messages = await prismaDB.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        seen: true,
        sender: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return messages;
  } catch (error: any) {
    console.log("[getMessages_Error]", error);
    return [];
  }
};

export default getMessages;
