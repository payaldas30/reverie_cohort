import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export async function POST(req) {
  try {
    const data = await req.json();
    const file = await req.file

    if(file){
      console.log(file)
    }
    const prompt = `Convert this sentence to bhojpuri sentence ${data.text}. Just give me that exact sentence and nothing else.`

    const result = await model.generateContent(prompt);

    return NextResponse.json({ summary: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
