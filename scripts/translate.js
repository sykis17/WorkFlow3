const fs = require('fs');
const path = require('path');

// Asetetaan DNS-järjestys, jotta haku on nopeampi (hyvä korjaus!)
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

async function translateWithGemini(apiKey, text, targetLang) {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;
    
    const systemInstruction = `
        Olet WorkFlow3-projektin asiantunteva kääntäjä. 
        Käännä teksti kielelle: ${targetLang === 'en' ? 'English' : 'Finnish'}.
        
        SÄÄNNÖT:
        1. SÄILYTÄ Frontmatter (--- ... ---) ja sen kentät ennallaan (paitsi title, jos tarpeen).
        2. SÄILYTÄ kaikki Docusaurus-komponentit kuten :::tip tai :::info.
        3. SÄILYTÄ Markdown-linkit ja kuvat.
        4. KÄYTÄ ammattimaista WorkFlow3-terminologiaa.
    `;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `${systemInstruction}\n\nTeksti:\n${text}` }] }]
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(`Gemini API Error: ${err.error?.message || response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error("API ei palauttanut tekstiä.");
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error(`Virhe käännöksessä (${targetLang}):`, error.message);
        throw error;
    }
}

// Tähän perään tulee sinun aiempi tiedostonhallinta-logiikka (processFile jne.)

// --- TIEDOSTONHALLINTA-LOGIIKKA ---

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error("VIRHE: GEMINI_API_KEY puuttuu ympäristömuuttujista!");
    process.exit(1);
}

async function processFile(filePath, targetLang) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`Käännetään (${targetLang}): ${filePath}...`);

    try {
        const translatedContent = await translateWithGemini(GEMINI_API_KEY, content, targetLang);
        
        // Määritetään kohdepolku i18n-rakenteen mukaan
        // docs/jotain.md -> i18n/en/docusaurus-plugin-content-docs/current/jotain.md
        const relativePath = path.relative(path.join(__dirname, '../docs'), filePath);
        const outPath = path.join(
            __dirname, 
            '../i18n', 
            targetLang, 
            'docusaurus-plugin-content-docs/current', 
            relativePath
        );

        // Luodaan kansiot tarvittaessa
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, translatedContent);
        console.log(`✅ Valmis: ${outPath}`);
    } catch (err) {
        console.error(`❌ Tiedostoa ${filePath} ei voitu kääntää:`, err.message);
    }
}

async function run(targetLang = 'en') {
    const docsDir = path.join(__dirname, '../docs');
    
    // Apufunktio tiedostojen etsimiseen alikansioista
    function getFiles(dir) {
        let results = [];
        const list = fs.readdirSync(dir);
        list.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat && stat.isDirectory()) {
                results = results.concat(getFiles(fullPath));
            } else if (fullPath.endsWith('.md') || fullPath.endsWith('.mdx')) {
                results.push(fullPath);
            }
        });
        return results;
    }

    const files = getFiles(docsDir);
    console.log(`Löydetty ${files.length} käännettävää tiedostoa.`);

    for (const file of files) {
        await processFile(file, targetLang);
        // Pieni tauko kutsujen välillä, jotta vältetään "Resource Exhausted" (429) -virheet
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

// Käynnistys
run().catch(console.error);