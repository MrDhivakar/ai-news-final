const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function rewriteNews(text) {
  try {
    const result = await model.generateContent(
      "Rewrite this news in simple Tamil: " + text
    );

    return result.response.text();
  } catch {
    return text;
  }
}

module.exports = rewriteNews;