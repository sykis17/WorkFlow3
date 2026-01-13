const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  // Testataan suoraan kirjaston kautta, ei fetchillä
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    console.log("Yritetään yhdistää Googleen...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Sano testi");
    console.log("Yhteys toimii! Vastaus:", result.response.text());
  } catch (err) {
    console.error("Yhteys epäonnistui.");
    console.error("Virhekoodi:", err.code);
    console.error("Viesti:", err.message);
  }
}

listModels();