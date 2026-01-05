# Portaalin arkkitehtuuri

Tämä sivu kuvaa järjestelmän teknistä rakennetta C4-mallin mukaisesti. Kaavio on toteutettu **PlantUML**-työkalulla.

![Maritime Legal Portal Konttikaavio](/img/arkkitehtuuri.png)

### Kaavion osat:
* **Kirjoittaja:** Ylläpitäjä, joka tuottaa sisältöä Markdown-muodossa.
* **GitHub Actions:** CI/CD-putki, joka tarkistaa tekstin laadun (Vale) ja rakentaa sivuston.
* **Docusaurus:** Moottori, joka muuntaa raakatekstin moderniksi dokumentaatioportaaliksi.