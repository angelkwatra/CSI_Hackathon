import { v4 as uuidv4 } from "uuid";
import { ActivityType, Activity } from "../types";

export function generateId(): string {
  return uuidv4();
}

/** Generate a random activity for real-time simulation */
export function generateRandomActivity(): Activity {
  const templates: {
    type: ActivityType;
    descriptions: string[];
    sizes: string[];
    costRange: [number, number];
    carbonRange: [number, number];
  }[] = [
    {
      type: "email",
      descriptions: [
        "Email with 10MB attachment",
        "Reply-all to 20 recipients",
        "Newsletter sent to 100 subscribers",
        "Email with inline images",
        "Forwarded chain email",
      ],
      sizes: ["10MB", "2MB", "5MB", "3.5MB", "1.2MB"],
      costRange: [0.03, 0.5],
      carbonRange: [0.005, 0.08],
    },
    {
      type: "ai",
      descriptions: [
        "AI prompt: 500 tokens",
        "AI code generation: 2000 tokens",
        "AI image analysis",
        "Chatbot response: 1500 tokens",
        "AI text summarization",
      ],
      sizes: [
        "500 tokens",
        "2000 tokens",
        "1024 tokens",
        "1500 tokens",
        "800 tokens",
      ],
      costRange: [0.1, 1.5],
      carbonRange: [0.003, 0.03],
    },
    {
      type: "storage",
      descriptions: [
        "File sync: 200MB",
        "Cloud backup initiated",
        "Document saved to drive",
        "Media files uploaded",
        "Cache cleared and rebuilt",
      ],
      sizes: ["200MB", "1GB", "50MB", "500MB", "150MB"],
      costRange: [0.02, 0.4],
      carbonRange: [0.01, 0.08],
    },
  ];

  const category = templates[Math.floor(Math.random() * templates.length)];
  const idx = Math.floor(Math.random() * category.descriptions.length);

  return {
    id: generateId(),
    type: category.type,
    description: category.descriptions[idx],
    size: category.sizes[idx],
    costINR: +(
      category.costRange[0] +
      Math.random() * (category.costRange[1] - category.costRange[0])
    ).toFixed(4),
    carbonKg: +(
      category.carbonRange[0] +
      Math.random() * (category.carbonRange[1] - category.carbonRange[0])
    ).toFixed(6),
    timestamp: new Date().toISOString(),
  };
}
