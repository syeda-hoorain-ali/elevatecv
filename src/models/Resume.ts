import mongoose, { Schema, type Document } from "mongoose"
import { type IResume } from "@/types/data";

interface Resume extends Document, IResume {
    _id: string;
    image: string;
}

const ResumeSchema = new Schema<IResume>({
    title: { type: String },
    image: { type: String, required: true },
    name: { type: String, required: true },
    jobtitle: { type: String, required: true },
    summary: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    template: { type: String, required: true },

    interests: [
        {
            hobby: { type: String, required: true },
        },
    ],

    languages: [
        {
            language: { type: String, required: true },
            rating: { type: Number, required: true, min: 0, max: 5 },
        },
    ],

    skills: [
        {
            name: { type: String, required: true },
            rating: { type: Number, required: true, min: 0, max: 5 },
        },
    ],

    experiences: [
        {
            title: { type: String, required: true },
            company: { type: String, required: true },
            city: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            summary: { type: String, required: true },
        },
    ],

    educations: [
        {
            universityName: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            degree: { type: String, required: true },
            major: { type: String, required: true },
        },
    ],
});


const ResumeModel = mongoose.models.Resume as mongoose.Model<Resume> || mongoose.model('Resume', ResumeSchema);
export default ResumeModel;
