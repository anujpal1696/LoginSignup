import sendVerificationEmail from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import  bcrypt from 'bcryptjs';


export  async function POST(request: Request){
    await dbConnect()
    try {
        const {username, email, password} = await request.json()
        const normalizedUsername = username.trim().toLowerCase();

        const existingUserAndVerified = await UserModel.findOne({
            username: normalizedUsername,
            isVerified: true
        })

        if(existingUserAndVerified){
            return Response.json(
                {
                    message: "User Already Exist",
                    success: "failure"
                },
                {
                    status: 400
                }
            )
        }

        const existingUserByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json(
                    {
                        message: "User Already Exist",
                        success: false
                    },
                    {
                        status: 400
                    }
                )
            }else{
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

                await existingUserByEmail.save()
            }
        }else{
            const expyDate = new Date(Date.now() + 3600000)
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                username: normalizedUsername,
                email,
                password: hashedPassword,
                isVerified: false,
                verifyCode,
                verifyCodeExpiry: expyDate,
                isAcceptingMessage: false,
                messages: []
            })
            await newUser.save()
        }
        // send Verification Email
        const res = await sendVerificationEmail(email, normalizedUsername, verifyCode);

        if(!res.success){
            return Response.json(
                {
                    success: false,
                    message: res.message
                },
                {
                    status: 500
                }
            )
            
        }
        return Response.json(
            {
                success: true,
                message: "User Register Successfully. Please verify your Email",
                username: normalizedUsername,
            },
            {
                status: 200
            }
        )
    } catch (error) {
        console.log("Error while connecting to Database");
        return Response.json(
            {
                message: "Error while connecting to Database",
                success: false
            },
            {
                status: 500
            }
        )
        
    }
}