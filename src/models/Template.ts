import mongoose, { Schema, type Document } from "mongoose"
import { type ITemplate } from "@/types/data";

interface Template extends Document, ITemplate {
    id: string;
}

const TemplateSchema: Schema<Template> = new Schema({
    image: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    htmlCode: {
        type: String,
        required: true,
    },

    isPaid: {
        type: Boolean,
        default: false,
    }
})


const TemplateModel = mongoose.models.Template as mongoose.Model<Template> || mongoose.model('Template', TemplateSchema);
export default TemplateModel;
