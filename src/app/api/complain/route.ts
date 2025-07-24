import { connectDB } from "@/lib/mongodb";
import ComplainModel from "@/models/Complain";
import { IApiResponse } from "@/types/apiResponse";
import { IComplain } from "@/types/data";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        await connectDB()

        const data: IComplain = await request.json();
        const complain = new ComplainModel(data);
        await complain.save();

        return NextResponse.json<IApiResponse>({
            success: true,
            message: "Complain added successfully",
            complainId: complain._id as string
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
