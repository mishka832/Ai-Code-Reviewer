const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeCode(code) {
  const prompt = `
You are a code reviewer AI. Respond in strict JSON ONLY.

Code:
${code}

Return JSON:
{
  "score": number (0-100),
  "feedback": ["suggestion 1","suggestion 2","suggestion 3"]
}
`;
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  let result;
  try {
    result = JSON.parse(response.choices[0].message.content);
  } catch (e) {
    result = { score: 50, feedback: ["Failed to parse JSON"] };
  }

  return result;
}

module.exports = { analyzeCode };
