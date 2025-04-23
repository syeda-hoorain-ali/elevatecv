import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export const POST = async (resuest: NextRequest) => {
    try {

        // const { plan } = await resuest.json()
        // monthly 412362
        // yearly 412413

        const apiInstense = axios.create({
            baseURL: "https://api.lemonsqueezy.com/v1/",
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`
            }
        })

        try {
            // const response = await apiInstense.get("/products/412362")
            const response = await apiInstense.get("/products/subscriptions")
            console.log(response.data);
            return NextResponse.json({...response.data}, { status: 200 })
       
       
        } catch (error) {
            const err = error as Error
            console.log("number 1", error)
            return NextResponse.json({ success: false, message: err.message }, { status: 500 })
        }


    } catch (error) {
        const err = error as Error
        console.log("number 2", error)
        return NextResponse.json({ success: false, message: err.message }, { status: 500 })
    }
}

export const DELETE = async (resuest: NextRequest) => {
    try {

        const { userId } = await resuest.json()
        // monthly 412362
        // yearly 412413

        const apiInstense = axios.create({
            baseURL: "https://api.lemonsqueezy.com/v1/",
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`
            }
        })

        try {
            // const response = await apiInstense.get("/products/412362")
            const response = await apiInstense.get("/products/subscriptions")
            console.log(response.data);
            return NextResponse.json({...response.data}, { status: 200 })
       
       
        } catch (error) {
            const err = error as Error
            console.log("number 1", error)
            return NextResponse.json({ success: false, message: err.message }, { status: 500 })
        }


    } catch (error) {
        const err = error as Error
        console.log("number 2", error)
        return NextResponse.json({ success: false, message: err.message }, { status: 500 })
    }
}

