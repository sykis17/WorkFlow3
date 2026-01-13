3. Miksi se sanoi "working tree clean"?
Tämä voi johtua kahdesta asiasta:

Polku-ongelma: Skripti tallensi tiedostot sellaiseen paikkaan, jota git add i18n/ ei huomioinut (esim. kirjoitusvirhe kansion nimessä).

Muuttuneet tiedostot: Jos kokeilit commitia uudelleen samalla tiedostolla, AI saattoi tuottaa täysin saman tekstin, eikä Git näe eroa.