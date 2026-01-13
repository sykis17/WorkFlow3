const fs = require('fs');
const path = require('path');

const coreFiles = [
  'docusaurus.config.js',
  'src/components/AIAssistant.js',
  'scripts/translate.js',
  'docs/ai-context/AI_INSTRUCTIONS.md'
];

// Käytetään .md päätettä, mutta kääritään sisältö koodiblokkeihin, 
// jotta MDX-moottori ei yritä suorittaa sitä.
let contextBuffer = "# Project Context for AI Assistant\n\n";
contextBuffer += "> Tämä tiedosto on automaattisesti generoitu koodikartta AI:lle.\n\n";

coreFiles.forEach(file => {
  const fullPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf-8');
    contextBuffer += `## File: ${file}\n\n\`\`\`javascript\n${content}\n\`\`\`\n\n`;
  }
});

// Tallennetaan polkuun, mutta varmistetaan kansio
const targetDir = path.resolve(process.cwd(), 'docs/ai-context');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

fs.writeFileSync(
  path.join(targetDir, 'CODE_MAP.md'),
  contextBuffer
);
console.log("✅ AI-konteksti päivitetty (CODE_MAP.md) koodiblokkien sisään.");