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
```


## Kommunikaatioprosessi: Kapteeni vs. Merimies

Tämä sekvenssikaavio kuvaa viestinnän kulkua virallisessa valitustilanteessa.

```mermaid
sequenceDiagram
    participant M as Merimies
    participant K as Kapteeni
    participant L as Lokikirja
    participant V as Viranomainen

    M->>K: Esittää valituksen ruoan laadusta
    K->>M: Pyytää todisteita
    M-->>K: Näyttää pilaantuneen korpun
    K->>L: Kirjaa tapahtuman ja valituksen
    Note over K,L: Pakollinen merkintä 24h sisällä
    L-->>V: Raportti tarkastetaan satamassa
    V->>K: Määrää sakon tai korjauksen
```