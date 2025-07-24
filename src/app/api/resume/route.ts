import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume";
import { IApiResponse } from "@/types/apiResponse";
import { IResume } from "@/types/data";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest,) => {
    await connectDB();

    try {
        const data: IResume = await request.json()
        const resume = new ResumeModel(data)

        await resume.save();
        return NextResponse.json<IApiResponse>({
            success: true,
            message: "Resume saved successfully",
            resumeId: resume._id as string,
        }, { status: 200 })

    } catch (error) {
        console.error(error);
        const err = error as Error

        return NextResponse.json<IApiResponse>({
            success: false,
            message: err.message || "Internal server error"
        }, { status: 500 })
    }
}