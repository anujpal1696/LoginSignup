import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, code } = await request.json();

        const decodedUsername = decodeURIComponent(username);
        console.log("Decoded username:", decodedUsername);

        const user = await UserModel.findOne({ username: decodedUsername });

        
        
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "username not found ",
                },
                {
                    status: 404,
                }
            );
        }
        // this part i am doing just becuase i do not have domain name so i can not send opts 
        if(user.isVerified){
            return Response.json(
                {
                    success: true,
                    message: "acount verified successfully ",
                },
                {
                    status: 200,
                }
            );
        }
        ///////////////////////////////////////////////////////////////




        if (!user.verifyCode || !user.verifyCodeExpiry) {
            return Response.json(
                {
                    success: false,
                    message: "Verification code missing or expired",
                },
                { status: 400 }
            );
        }

        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeNotExpired && isCodeValid) {
            user.isVerified = true;
            await user.save();
            return Response.json(
                {
                    success: true,
                    message: "acount verified successfully ",
                },
                {
                    status: 200,
                }
            );
        } else if (!isCodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message:
                        "Verification code has expired Please signup again to get a new code",
                },
                {
                    status: 400,
                }
            );
        } else {
            return Response.json(
                {
                    success: false,
                    message: "Incorrect Verification code",
                },
                {
                    status: 400,
                }
            );
        }
    } catch (error) {
        console.error("Error verifying user", error);
        return Response.json(
            {
                success: false,
                message: "Error verifying user",
            },
            {
                status: 500,
            }
        );
    }
}
