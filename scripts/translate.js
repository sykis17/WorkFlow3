const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function translateText(text, targetLang) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Olet ammattimainen kääntäjä. Käännä tämä Markdown-tiedosto kielelle ${targetLang}. 
                  SÄILYTÄ kaikki Frontmatter-tiedot (--- välissä olevat tiedot) ja Markdown-syntaksi. 
                  Älä käännä teknisiä avainsanoja tai tiedostopolkuja.
                  Teksti: ${text}`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function processFile(relativeFsPath) {
  console.log(`Aloitetaan käsittely tiedostolle: ${relativeFsPath}`);
  const fullPath = path.join(process.cwd(), relativeFsPath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Virhe: Tiedostoa ei löydy polusta ${fullPath}`);
    return;
  }

  const content = fs.readFileSync(fullPath, "utf-8");
  const targetLangs = [
    { code: 'en', name: 'English' },
    { code: 'uk', name: 'Ukrainian' }
  ];

  for (const lang of targetLangs) {
    console.log(`Käännetään: ${relativeFsPath} -> ${lang.name}`);
    const translation = await translateText(content, lang.name);

    // Muodostetaan Docusauruksen vaatima i18n-polku
    // docs/ohje.md -> i18n/en/docusaurus-plugin-content-docs/current/ohje.md
    const fileName = path.basename(relativeFsPath);
    const subDir = path.dirname(relativeFsPath).replace('docs', '');
    
    const targetDir = path.join(
      process.cwd(), 
      'i18n', 
      lang.code, 
      'docusaurus-plugin-content-docs', 
      'current',
      subDir
    );

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(path.join(targetDir, fileName), translation);
  }
}

// Haetaan muuttuneet tiedostot komentoriviltä (GitHub Actions syöttää nämä)
// ... (alkuosa kuten viestissäsi)

async function processFile(relativeFsPath) {
  console.log(`Aloitetaan käsittely tiedostolle: ${relativeFsPath}`);
  const fullPath = path.join(process.cwd(), relativeFsPath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`Virhe: Tiedostoa ei löydy polusta ${fullPath}`);
    return;
  }

  const content = fs.readFileSync(fullPath, "utf-8");
  const targetLangs = [
    { code: 'en', name: 'English' },
    { code: 'uk', name: 'Ukrainian' }
  ];

  for (const lang of targetLangs) {
    try {
      console.log(`Käännetään: ${relativeFsPath} -> ${lang.name}`);
      const translation = await translateText(content, lang.name);

      const fileName = path.basename(relativeFsPath);
      const subDir = path.dirname(relativeFsPath).replace('docs', '');
      
      const targetDir = path.join(
        process.cwd(), 
        'i18n', 
        lang.code, 
        'docusaurus-plugin-content-docs', 
        'current',
        subDir
      );

      if (!fs.existsSync(targetDir)) {
        console.log(`Luodaan kansio: ${targetDir}`);
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const finalPath = path.join(targetDir, fileName);
      fs.writeFileSync(finalPath, translation);
      console.log(`✅ Tallennettu onnistuneesti: ${finalPath}`);
    } catch (err) {
      console.error(`❌ Virhe kääntäessä kielelle ${lang.name}:`, err.message);
    }
  }
}

// TÄRKEÄ MUUTOS: Käytetään asynkronista suoritusta
async function run() {
  const files = process.argv.slice(2);
  console.log("Käsiteltävät tiedostot:", files);

  if (files.length === 0) {
    console.log("Ei muuttuneita tiedostoja käsiteltäväksi.");
    return;
  }

  // Käytetään for...of silmukkaa, jotta await toimii oikein
  for (const file of files) {
    if (file.endsWith('.md') || file.endsWith('.mdx')) {
      await processFile(file);
    }
  }
  console.log("Kaikki tiedostot käsitelty!");
}

run().catch(err => {
  console.error("Kriittinen virhe suorituksessa:", err);
  process.exit(1);
});