import mongoose, {Schema, Document, Mongoose} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date
}

const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "username is required "],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "username is required "],
        unique: true,
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please use a valid Email Address"]
    },
    password: {
        type: String,
        required: [true, "Password is required "]
    },
    verifyCode: {
        type: String,
        required: [true, "verifyCode is required "]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "verifyCodeExpiry is required "],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    messages: [messageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema)

export default UserModel;
