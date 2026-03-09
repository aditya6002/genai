const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

// Initialize the Google GenAI client with your API key
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// Function to invoke the Gemini AI model with the provided contents
async function invokeGeminiAi(contents) {
  const res = await ai.models.generateContent({
    model: process.env.GOOGLE_GENAI_MODEL,
    contents: contents,
  });
  return res.text;
}

module.exports = {
  invokeGeminiAi,
};
