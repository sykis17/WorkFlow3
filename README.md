# Maritime Legal Portal – Moderni Merioikeuden Dokumentaatio

Tämä projekti on prototyyppi modernisoidusta merioikeuden portaalista. Sen tavoitteena on muuttaa perinteinen, vaikeaselkoinen lakiteksti saavutettavaksi, haettavaksi ja visuaalisesti selkeäksi dokumentaatioksi.

🚀 **Live Demo:** [Linkki GitHub Pages -sivustollesi]

## 🛠️ Teknologiat & Menetelmät

Projektissa on hyödynnetty alan standardeja "Documentation-as-Code" -menetelmiä:

- **Docusaurus (React):** Staattinen sivustogeneraattori, joka tarjoaa nopean haun ja saavutettavuuden.
- **Vale (Linter):** Automaattinen tyylitarkistin, joka varmistaa kielen selkeyden ja teknisen laadun.
- **PlantUML & C4-malli:** Arkkitehtuurin visualisointi koodina (Diagrams-as-Code).
- **GitHub Actions:** CI/CD-putki, joka ajaa automaattiset testit ja julkaisee sivuston jokaisen muutoksen jälkeen.

## 🛠️ Interaktiiviset Demo-ominaisuudet

Tämä portaali ei ole vain staattista tekstiä, vaan se sisältää moderneja Documentation-as-Code -ratkaisuja:

1. **Dynaaminen Datataulukko (React):** - Toteutettu MDX-komponenttina.
   - Sisältää reaaliaikaisen suodatuksen ja sarakkeiden järjestämisen.
   - *Teknologiat:* React Hooks (`useState`), CSS Modules.

2. **Priorisointityökalu (Drag & Drop):**
   - Käyttäjä voi järjestellä pelastustoimenpiteitä tärkeysjärjestykseen.
   - Osoittaa kyvyn rakentaa interaktiivisia oppimateriaaleja.
   - *Teknologiat:* `@dnd-kit/core`, `@dnd-kit/sortable`.

3. **Live Code Editor:**
   - Mahdollistaa koodin tai säädösmallien muokkaamisen suoraan selaimessa reaaliaikaisella esikatselulla.
   - *Teknologiat:* `@docusaurus/theme-live-codeblock`, `react-live`.

4. **Arkkitehtuuri-as-Code:**
   - Kaaviot on piirretty Mermaid- ja PlantUML-kielillä, mikä mahdollistaa dokumentaation ja kuvien versionhallinnan samassa paikassa.

## 🏗️ Arkkitehtuuri

Järjestelmän rakenne on kuvattu C4-mallin mukaisesti. Tekniset kaaviot löytyvät portaalin [Arkkitehtuuri-sivulta].

### Prosessin kulku
Portaali sisältää interaktiivisia prosessikuvauksia, jotka auttavat merimiehiä ymmärtämään oikeusprosesseja askel askeleelta, poistaen perinteisen lakitekstin kankeuden.

## 📈 Tärkeimmät ominaisuudet

- **Haku:** Nopea, paikallinen haku dokumentaation sisällä.
- **Laadunvarmistus:** Vale-linter tarkistaa, että teksti noudattaa sille asetettuja selkeän kielen sääntöjä.
- **Versiohallinta:** Kaikki sisältö ja kaaviot hallinnoidaan Gitillä, mikä mahdollistaa täyden muutoshistorian.

## 🚀 Kehitysympäristön pystytys

1. Kloonaa repo: `git clone [reposi-url]`
2. Asenna riippuvuudet: `npm install`
3. Käynnistä kehityspalvelin: `npm start`

---
*Tämä projekti on osa teknisen dokumentoinnin portfoliotani.*