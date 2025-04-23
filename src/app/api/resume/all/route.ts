import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume";
import UserModel from "@/models/User";
import { IApiResponse } from "@/types/apiResponse";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    await connectDB();

    try {
        const userId = request.nextUrl.searchParams.get('user-id')
        if (!userId) {
            return NextResponse.json<IApiResponse>({
                success: false,
                message: "User id not found",
            }, { status: 403 })
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json<IApiResponse>({
                success: false,
                message: "Templates not found",
            }, { status: 404 })
        }

        const resumeList = await ResumeModel.find(
            { _id: { $in: user.resumeList } }
        )

        const data = resumeList.map(item => ({
            ...item, 
            _id: item._id as string
        }))

        return NextResponse.json<IApiResponse>({
            success: true,
            message: "Successfull",
            resumeList: data
        }, { status: 200 })

    } catch (error) {
        console.log(error);
        const err = error as Error

        return NextResponse.json<IApiResponse>({
            success: false,
            message: err.message || "Internal server error"
        }, { status: 500 })
    }
}
