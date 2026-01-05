# Oikeusprosessin kulku merellä

Tämä kaavio kuvaa prosessia, jota noudatetaan, kun merimies kohtaa epäoikeudenmukaisuutta.

```mermaid
graph TD
    A[Merimies kokee vääryyttä] --> B{Onko laiva satamassa?}
    B -- Kyllä --> C[Valitus konsulille tai viranomaiselle]
    B -- Ei --> D[Kirjaus lokikirjaan ja todistajien kerääminen]
    D --> E[Odotus seuraavaan satamaan]
    E --> C
    C --> F[Oikeudenkäynti ja ratkaisu]
    F --> G[EBOOK-raportin arkistointi]