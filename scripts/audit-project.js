process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const fs = require('fs');
const path = require('path');

async function runAudit() {
  const contextPath = path.resolve(process.cwd(), 'static/ai-context/CODE_MAP.txt');
  if (!fs.existsSync(contextPath)) {
    console.error("❌ CODE_MAP.txt puuttuu. Aja ensin: node scripts/update-ai-context.js");
    return;
  }

  const context = fs.readFileSync(contextPath, 'utf-8');
  const apiKey = process.env.GEMINI_API_KEY;

  console.log("🔍 Analysoidaan projektia (Docusaurus, Maritime, Rakenteet)...");

  const prompt = `
    Olet WorkFlow3-projektin laadunvarmistaja. Tässä on projektin koodikartta:
    ${context}

    "Haamutiedon etsintä": "Etsi koodista ja konfiguraatioista tekstejä, jotka vaikuttavat alkuperäisen maritime-teeman esimerkkidatalta (esim. Placeholder-nimet, testisähköpostit tai keksityt laivayhtiöt), jotka pitäisi korvata WorkFlow3:n omalla tiedolla."

    "Kielivalikon eheys": "Tarkista, onko ukrainan kieli (uk) otettu huomioon kaikissa komponenteissa, vai onko se vain konfiguraatiotasolla ilman varsinaista sisältöä?"

    "Käyttöliittymän logiikka": "Analysoi AIAssistant.js -tiedostoa: Onko siinä riskiä, että haku kaatuu, jos CODE_MAP.txt on liian suuri, ja miten parantaisit virheiden käsittelyä?"

  `;

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  const data = await response.json();
  console.log("\n--- AI:n ANALYYSI JA KORJAUSEHDOTUKSET --- \n");
  console.log(data.candidates[0].content.parts[0].text);
}

runAudit();