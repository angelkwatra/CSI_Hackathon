import { Router, Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { getStore } from "../data/store";
import { generateId } from "../utils/helpers";
import { ImpactLevel } from "../types";

const router = Router();

// Initialize the Google GenAI SDK later when env vars are guaranteed to be loaded

/** GET /api/ai-suggestions — Generate and return AI suggestions based on recent activities */
router.get("/", async (req: Request, res: Response) => {
  const { userId = "default" } = req.query as Record<string, string>;
  const store = getStore(userId);
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    // 1. Get the last 20 activities for this user
    const recentActivities = store.activities.slice(0, 20);

    // 2. Prepare the prompt
    const prompt = `
System Prompt: You are a sustainability AI. Analyze the following user digital activities JSON. 
Return exactly 3 specific, actionable suggestions to reduce their carbon footprint.
Strict return the response as a JSON array with the exact keys: title, description, category (must be 'email', 'storage', or 'ai'), savingsINR (number), and savingsCO2 (number).
Ensure the tone is helpful and personalized, as if speaking directly to the user about their specific activities.

User Digital Activities:
${JSON.stringify(recentActivities, null, 2)}
    `;

    // 3. Call the Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", 
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const outputText = response.text || "[]";
    let parsedData = [];
    try {
      parsedData = JSON.parse(outputText);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", outputText);
      return res.status(500).json({ error: "AI response was not valid JSON" });
    }

    // 4. Transform the parsed data into Suggestion objects
    const newSuggestions = parsedData.map((item: any) => {
      // Determine impact roughly based on savingsCO2
      let impact: ImpactLevel = "low";
      if (item.savingsCO2 > 2) impact = "high";
      else if (item.savingsCO2 > 0.5) impact = "medium";

      return {
        id: generateId(),
        title: item.title,
        description: item.description,
        savingsINR: item.savingsINR || 0,
        savingsCO2: item.savingsCO2 || 0,
        impact,
        category: item.category,
        applied: false,
      };
    });

    // 5. Optionally add to our in-memory store so the /apply patch endpoint still works!
    // We maintain a limited number of suggestions in store to prevent memory leaks over time.
    store.suggestions.unshift(...newSuggestions);
    if (store.suggestions.length > 50) {
      store.suggestions.length = 50; 
    }

    // Filter by impact if provided in query string
    const { impact } = req.query as Record<string, string>;
    let result = newSuggestions;
    if (impact && impact !== "all") {
      result = result.filter((s: { impact: string; }) => s.impact === impact);
    }

    res.json(result);
  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ error: "Failed to generate AI suggestions", details: String(error) });
  }
});

export default router;
