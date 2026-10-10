# Regenradar

Mobile Web-App (PWA): Regnet es bei mir jetzt oder in den nächsten 2 Stunden?

## Was sie kann
- Antwort oben: "Trocken bis mindestens 14:25", "Regen ab 13:10", "Es regnet · hört gegen 13:40 auf"
- Zeitleiste unten: Regen an deinem Ort in 5-Minuten-Schritten bis +2 Std. Am Handle ziehen zeigt die Karte zu diesem Zeitpunkt
- Karte mit Orten und Grenzen, Radar in einer Blauskala von Niesel bis Unwetter
- Ort: GPS-Button oder auf die Karte tippen
- Darstellung: Button unter dem Standort-Button schaltet Auto, Hell, Dunkel
- Aktualisiert sich alle 5 Minuten und beim Zurückkehren in die App

## Aufs Handy bringen
HTTPS ist Pflicht, sonst funktionieren Standort und Installation nicht.

Schnellster Weg: Ordner auf https://app.netlify.com/drop ziehen. Alternativ GitHub Pages.

Auf dem Handy die URL öffnen:
- iOS (Safari): Teilen → Zum Home-Bildschirm
- Android (Chrome): Menü → App installieren

Lokal testen: `python3 -m http.server 8000` im Ordner, dann http://localhost:8000

## Datenquellen
- Karte: DWD GeoServer WMS, Layer `dwd:Niederschlagsradar` (mm/h, Messung und Nowcast bis +2 Std.). Die Kacheln werden im Browser in die eigene Blauskala umgefärbt
- Punktwert für deinen Ort: Bright Sky API `/radar` (DWD RV-Produkt, 1 km Raster)
- Basiskarte: Esri Light/Dark Gray Canvas

Quellenvermerk "Deutscher Wetterdienst" ist Pflicht und steht in der Attribution.

## Klassen (mm/h)
Niesel ab 0,1 · leicht ab 0,4 · mäßig ab 2 · stark ab 5 · Unwetter ab 15

## Bekannte Grenzen
- Abdeckung nur Deutschland plus Grenzgebiet
- Karte und Punktwert kommen aus zwei DWD-Produkten. Sie stimmen fast immer überein, aber nicht garantiert pixelgenau
- Esri-Basiskarten sind für private, nicht-kommerzielle Nutzung frei. Für ein öffentliches Produkt Lizenz klären
