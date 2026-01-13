const fs = require('fs');
const path = require('path');

// Tiedostot, jotka AI:n on tärkeä ymmärtää
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

fs.writeFileSync(
  path.resolve(process.cwd(), 'docs/ai-context/CODE_MAP.md'),
  contextBuffer
);
console.log("✅ AI-konteksti päivitetty (CODE_MAP.md)");