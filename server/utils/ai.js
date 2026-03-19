const axios = require("axios");

module.exports = async (text) => {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: "Convert this into short Tamil news:\n" + text
              }
            ]
          }
        ]
      }
    );

    return res.data.candidates[0].content.parts[0].text;
  } catch {
    return text;
  }
};