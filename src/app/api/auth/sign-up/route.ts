import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    await connectDB()

    try {
        const {email, password } = await request.json()
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "Email already registered",
            }, { status: 401 })
        }

        const color = Math.random().toString(16)
        const logo = `https://via.placeholder.com/150x150/${color}/ffffff?text=${email.charAt(0).toUpperCase()}`

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            email,
            logo,
            username: email.split('@')[0],
            password: hashedPassword,
            isAdmin: false,
            isMember: false,
            resumeList: [],
        })

        await user.save();
        return NextResponse.json({
            userId: user._id as string,
            success: true,
            message: "User registered successfully"
        }, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
}