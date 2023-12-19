import prismaDB from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
    const session = await getSession();

    if (!session?.user?.email) {
        return [];
    }

    try {
        const users = await prismaDB.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                NOT: {
                    email: session.user.email,
                },
            },
        });

        return users;
    } catch (error: any) {
        console.log("GET_USER_UERROR", error);
        return [];
    }
};

export default getUsers;
