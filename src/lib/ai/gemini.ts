import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateFashionDesign(
    measurements: Record<string, string | number>,
    preferences: string[],
    style: string
) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are an expert African fashion designer for White Dominion.
    Create a unique, high-fashion outfit design based on these details:
    
    Measurements: ${JSON.stringify(measurements)}
    Preferences: ${preferences.join(", ")}
    Style Category: ${style}
    
    Output a JSON object with:
    - name: Creative name for the outfit
    - description: Detailed description of materials, cut, and African inspirations
    - image_prompt: A high-quality prompt for an image generator (Stable Diffusion) to visualize this outfit. Focus on photorealism, lighting, and fabric details.
    - specs: Technical tailoring specs based on measurements.
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Basic cleanup to ensure JSON parsing
    const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse Gemini response", e);
        return null;
    }
}
