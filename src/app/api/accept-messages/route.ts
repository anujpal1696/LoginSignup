import UserModel from "@/model/User";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions);
    const user: User = session?.user;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not authenticated",
            },
            {
                status: 401,
            }
        );
    }

    const userId = user._id;
    const { acceptMessages } = await request.json();
    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    isAcceptingMessage: acceptMessages,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message:
                        "Unable to find user to update message acceptance status",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Message acceptance status updated successfully",
                updatedUser,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating message acceptance status:", error);
        return Response.json(
            {
                success: false,
                message: "Error updating message acceptance status",
            },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions);
    const user: User = session?.user;

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not authenticated",
            },
            {
                status: 401,
            }
        );
    }

    const userId = user._id;

    try {
        const userNew = await UserModel.findById(userId);

        if (!userNew) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                {
                    status: 401,
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "successfully found the accepting messages",
                isAcceptingMessages: userNew.isAcceptingMessage,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error retrieving message acceptance status:", error);
        return Response.json(
            {
                success: false,
                message: "Error retrieving message acceptance status",
            },
            { status: 500 }
        );
    }
}
