import { connectDB } from "@/lib/mongodb";
import TemplateModel from "@/models/Template";
import { IApiResponse } from "@/types/apiResponse";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectDB();

        const templates = await TemplateModel.find();

        if (!templates) {
            return NextResponse.json<IApiResponse>({
                success: false,
                message: "Templates not found",
            }, { status: 404 })
        }

        const data = templates.map(item => ({
            id: item._id as string,
            image: item.image,
            name: item.name,
            htmlCode: item.htmlCode,
            isPaid: item.isPaid,
        }))

        return NextResponse.json<IApiResponse>({
            success: true,
            message: "Resume saved successfully",
            templates: data
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