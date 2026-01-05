# Portaalin arkkitehtuuri (C4-malli)

Tämä kaavio kuvaa portaalin teknistä rakennetta C4-mallin mukaisesti.

## Taso 1: Järjestelmäkonteksti

```mermaid
C4Context
    title Järjestelmäkonteksti: Maritime Legal Portal
    
    Person(user, "Lukija/Rekrytoija", "Henkilö, joka tutkii modernisoitua lakitekstiä.")
    System(portal, "Legal Portal", "Tarjoaa haettavan ja visuaalisen käyttöliittymän dokumentaatioon.")
    System_Ext(github, "GitHub", "Isännöi lähdekoodia ja julkaisee sivuston.")

    Rel(user, portal, "Lukee ja hakee tietoa")
    Rel(portal, github, "Hakee päivitykset ja sisällön")
```

# Portaalin tekninen rakenne

Tämä C4-malli kuvaa, miten portaali on rakennettu.

```mermaid
C4Container
    title Konttikaavio: Maritime Legal Portal
    
    Person(writer, "Kirjoittaja (Sinä)", "Luo sisältöä ja sääntöjä.")
    
    Container(docusaurus, "Docusaurus App", "React/Node.js", "Generoi staattisen sivuston ja tarjoaa hakutoiminnon.")
    ContainerDb(markdown, "Markdown Files", "Git/FileSystem", "Sisältää varsinaisen tekstidatan ja säännöt.")
    Container(actions, "GitHub Actions", "CI/CD Pipeline", "Ajaa Valen ja rakentaa sivuston automaattisesti.")

    Rel(writer, markdown, "Kirjoittaa", "VS Code")
    Rel(markdown, actions, "Triggeröi buildin", "Push")
    Rel(actions, docusaurus, "Rakentaa")
```