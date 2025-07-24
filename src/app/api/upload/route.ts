import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary"
import axios, { AxiosError } from "axios";

export const POST = async (request: NextRequest) => {

    if (!process.env.CLOUDINARY_API_SECRET ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_CLOUD_NAME) {
        return NextResponse.json({
            success: false,
            message: "Missing Cloudinary configuration",
        }, { status: 500 });
    }

    try {

        const userData = await request.formData()
        const timestamp = Math.round((new Date).getTime() / 1000);
        const file = userData.get('file') as File;
        const publicId = userData.get('publicId') as string;

        if (!file) {
            return NextResponse.json({
                success: false,
                message: "No file provided"
            }, { status: 400 });
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        // Generate signature
        const signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp,
            public_id: publicId
        }, process.env.CLOUDINARY_API_SECRET);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("public_id", publicId);
        formData.append("signature", signature);
        formData.append("api_key", process.env.CLOUDINARY_API_KEY);
        formData.append("timestamp", timestamp.toString());

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, formData);

            return NextResponse.json({
                success: true,
                message: "Image uploaded successfully",
                imageUrl: response.data.url,
            }, { status: 200 });


        } catch (error) {
            const axiosError = error as AxiosError<{ error: { message: string } }>
            console.error(error)
            const message = axiosError.response?.data.error.message || axiosError.message
            return NextResponse.json({
                success: false,
                message: message
            }, { status: axiosError.status })
        }


    } catch (error) {
        console.error(error)
        const err = error as Error

        return NextResponse.json({
            success: false,
            message: err.message || "Internal server error"
        }, { status: 500 })
    }
}