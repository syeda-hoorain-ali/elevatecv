import mongoose, { Schema, type Document } from "mongoose"
import { type IComplain } from "@/types/data";

interface Complain extends Document, IComplain {

    createdAt: Date;
}

const ComplainSchema: Schema<Complain> = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    
    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    
    message: {
        type: String,
        required: true,
    },
    
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const ComplainModel = mongoose.models.Complain as mongoose.Model<Complain> || mongoose.model('Complain', ComplainSchema);
export default ComplainModel;
