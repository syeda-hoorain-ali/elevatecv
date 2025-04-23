import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
    email: string;
    logo: string;
    username: string;
    password: string;
    isAdmin: boolean;
    resumeList: string[];
    membership: "none" | "monthly" | "yearly" | "trial_monthly" | "trial_yearly";
    subscription: {
        id: string;
        status: String;
        cancelled: false;
        renews_at: Date;
        created_at: Date;
        updated_at: Date;
        trial_ends_at: Date;
    } | null
}

const UserSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    
    logo: {
        type: String,
        required: true,
    },
    
    username: {
        type: String,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
    },
    
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    
    membership: {
        type: String,
        required: true,
        default: "none",
    },
    
    resumeList: [{
        type: String,
        required: true,
        default: [],
    }],

    subscription: {
        id:{
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        cancelled: {
            type: Boolean,
            required: true,
        },
        renews_at: {
            type: Date,
            required: true,
        },
        created_at: {
            type: Date,
            required: true,
        },
        updated_at: {
            type: Date,
            required: true,
        },
        trial_ends_at: {
            type: Date,
            required: true,
        },
    }

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;

