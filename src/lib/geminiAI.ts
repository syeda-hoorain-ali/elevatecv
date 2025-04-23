import { GoogleGenerativeAI } from "@google/generative-ai";

export const askGemini = async (prompt: string) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);

        console.log(result);
        return result.response.text()

    } catch (error) {
        console.log(error);
        return ''
    }
}
