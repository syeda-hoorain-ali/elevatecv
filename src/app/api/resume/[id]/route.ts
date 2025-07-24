import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume";
import { IApiResponse } from "@/types/apiResponse";
import { IResume } from "@/types/data";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
    params: Promise<{ id: string; }>
}

export const GET = async (request: NextRequest, { params }: IParams) => {
    await connectDB();

    try {
        const { id } = await params
        if (!id) {
            return NextResponse.json<IApiResponse>({
                success: false,
                message: "Parameter of resume id not received",
            }, { status: 401 })
        }

        const resume = await ResumeModel.findById(id);
        if (!resume) {
            return NextResponse.json<IApiResponse>({
                success: false,
                message: "Resume not found",
            }, { status: 404 })
        }

        return NextResponse.json<IApiResponse>({
            success: true,
            message: "Resume found successfully",
            resumeId: resume._id as string,
            resume: {...resume, _id: resume._id as string}
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

export const PATCH = async (request: NextRequest, { params }: IParams) => {
    await connectDB();

    try {
        const data: IResume = await request.json()
        const { id } = await params

        if (!id) {
            return NextResponse.json<IApiResponse>({
                success: false,
                message: "Parameter of resume id not received",
            }, { status: 401 })
        }

        const resume = await ResumeModel.findByIdAndUpdate(id, data);
        if (!resume) {
            return NextResponse.json<IApiResponse>({
                success: false,
                message: "Resume not found",
            }, { status: 404 })
        }

        await resume.save();
        return NextResponse.json<IApiResponse>({
            success: true,
            message: "Resume updated successfully",
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

export const DELETE = async (request: NextRequest, { params }: IParams) => {
    await connectDB();

    try {
        const { id } = await params
        if (!id) {
            return NextResponse.json<IApiResponse>({
                success: false,
                message: "Parameter of resume id not received",
            }, { status: 401 })
        }

        const resume = await ResumeModel.findByIdAndDelete(id);
        if (!resume) {
            return NextResponse.json<IApiResponse>({
                success: false,
                message: "Resume not found",
            }, { status: 404 })
        }

        return NextResponse.json<IApiResponse>({
            success: true,
            message: "Resume deleted successfully",
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

