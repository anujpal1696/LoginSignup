import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();
    const { username, content } = await request.json();
    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return Response.json(
                { message: "User not found", success: false },
                { status: 404 }
            );
        }

        if (!user.isAcceptingMessage) {
            return Response.json(
                { message: "User is not accepting messages", success: false },
                { status: 403 } // 403 Forbidden status
            );
        }

        const msg = {
            content,
            createdAt: new Date(),
        };
        user.messages.push(msg as Message);
        await user.save();
    } catch (error) {
        console.error("Error adding message:", error);
        return Response.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
