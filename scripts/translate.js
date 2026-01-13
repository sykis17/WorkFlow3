const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function translateText(text, targetLang) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
const files = process.argv.slice(2);
files.forEach(file => {
  if (file.endsWith('.md') || file.endsWith('.mdx')) {
    processFile(file).catch(err => console.error(`Virhe tiedostossa ${file}:`, err));
  }
});