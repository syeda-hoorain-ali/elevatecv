import mongoose from "mongoose";

let connection: number

export const connectDB = async () => {

    if (connection) {
        console.log('Already connected');
        return;
    }

    if (!process.env.MONGODB_URI) {
        console.warn('Mongo db uri not found');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, { dbName: "resume_builder" })
        connection = db.connections[0].readyState;
        console.log("Database connect successfully");

    } catch (error) {
        console.error(error);
        console.error('Database connection failed');
    }
}