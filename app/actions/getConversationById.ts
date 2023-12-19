import prismaDB from "@/app/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    const conversation = await prismaDB.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!conversation) return null;

    return conversation;
  } catch (error: any) {
    console.log("[getConversationById_Error]", error);
    return null;
  }
};

export default getConversationById;
