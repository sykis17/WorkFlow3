const fs = require('fs');
const path = require('path');

// YHTEYSKORJAUKSET (Laitetaan heti alkuun)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');

const coreFiles = [
  'docusaurus.config.js',
  'src/components/AIAssistant.js',
  'scripts/translate.js',
  'docs/ai-context/AI_INSTRUCTIONS.md'
];

let contextBuffer = "PROJECT CONTEXT FOR AI ASSISTANT:\n\n";

coreFiles.forEach(file => {
  const fullPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf-8');
    contextBuffer += `--- FILE: ${file} ---\n${content}\n\n`;
  }
});

// Tallennetaan CODE_MAP.txt (static-kansioon on paras paikka buildin kannalta)
const targetDir = path.resolve(process.cwd(), 'static/ai-context');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

fs.writeFileSync(path.join(targetDir, 'CODE_MAP.txt'), contextBuffer);
console.log("✅ AI-konteksti päivitetty: static/ai-context/CODE_MAP.txt");