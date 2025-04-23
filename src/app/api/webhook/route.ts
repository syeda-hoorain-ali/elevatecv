import { connectDB } from "@/lib/mongodb";
import { getUserMembership } from "@/lib/utils";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

interface IPayment {
    id: string;
    links: { self: string; };
    attributes: {
        urls: any;
        status: string;
        refunded: false;
        user_email: string;
        created_at: string; // Date
        updated_at: string; // Date
    }
}

interface IData {
    id: string;
    links: { self: string; };
    attributes: {
        urls: any;
        status: 'on_trial' | 'active' | 'paused' | 'past_due' | 'unpaid' | 'cancelled' | 'expired';
        cancelled: false;
        renews_at: Date;
        created_at: Date;
        updated_at: Date;
        user_email: string;
        product_id: number;
        product_name: string;
        trial_ends_at: Date;
    }
}

export const POST = async (request: NextRequest) => {
    await connectDB();

    try {
        const { data }: { data: IData } = await request.json()
        const user = await UserModel.findOne({ email: data.attributes.user_email });

        console.log(data)

        if (!user)
            return NextResponse.json({
                succes: false,
                message: "User not found"
            }, { status: 404 });


        user.membership = getUserMembership(data.attributes.status, data.attributes.product_id);
        user.subscription = { ...data.attributes, id: data.id };

        if (user.membership === "none") user.subscription = null;
        await user.save()


        return NextResponse.json({
            succes: true,
            message: `${user.username} has purchased ${data.attributes.product_name}`
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            succes: false,
            message: (error as Error).message
        }, { status: 500 })
    }
}