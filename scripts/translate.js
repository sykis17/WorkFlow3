const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const fs = require("fs");
const path = require("path");

// Huom: Emme tarvitse enää GoogleGenerativeAI-kirjastoa tässä skriptissä, 
// koska käytämme suoraa fetch-kutsua.

async function translateText(text, targetLang) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY muuttujaa ei löydy!");

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ 
        parts: [{ 
          text: `Olet kääntäjä. Käännä seuraava Markdown-teksti kielelle ${targetLang}. Säilytä muotoilu: \n\n${text}` 
        }] 
      }]
    })
  });

  const data = await response.json();
  
  if (data.error) {
    throw new Error(`Google API virhe: ${data.error.message}`);
  }

  if (!data.candidates || !data.candidates[0].content) {
    console.log("API vastaus:", JSON.stringify(data));
    throw new Error("API ei palauttanut käännöstä.");
  }

  return data.candidates[0].content.parts[0].text;
}

// ... loppuosa processFile ja run funktioista säilyy samana kuin laitoit ...