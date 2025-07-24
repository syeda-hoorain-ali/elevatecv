import { connectDB } from "@/lib/mongodb";
import TemplateModel from "@/models/Template";
import { IApiResponse } from "@/types/apiResponse";
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
                message: "Parameter of template id not received",
            }, { status: 401 })
        }

        const template = await TemplateModel.findById(id);
        if (!template) {
            return NextResponse.json<IApiResponse>({
                success: false,
                message: "Template not found",
            }, { status: 404 })
        }

        const data = {
            id: template._id as string,
            image: template.image,
            name: template.name,
            htmlCode: template.htmlCode,
            isPaid: template.isPaid,
        }

        return NextResponse.json<IApiResponse>({
            success: true,
            message: "Resume saved successfully",
            template: data
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