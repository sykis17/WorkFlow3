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
@startuml
!include [https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml](https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml)

skinparam shadowing false

start
:Epäoikeudenmukaisuus tapahtuu;
:Dokumentoi tapahtuma lokikirjaan;
if (Kapteeni osallinen?) then (kyllä)
  :Ota yhteys varustamoon suoraan;
else (ei)
  :Raportoi kapteenille;
endif
:Ota yhteys ammattiliittoon/ITF;
stop
@enduml