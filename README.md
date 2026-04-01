# 🐔 LeviChicken Website

Eine moderne Webseite für den Verkauf von Masthähnchen aus Bamako.

## 📌 Projektbeschreibung

Diese Webseite wurde entwickelt, um Produkte zu präsentieren und Kunden die Möglichkeit zu geben, direkt eine Bestellung zu machen.

Die Seite zeigt:
- Produkte (Frisches Hähnchen, Verarbeitung, Lieferung)
- Informationen über den Ablauf
- Kundeninformationen
- Ein Bestellformular (WhatsApp)
- Dynamische Inhalte über eine API

---

## 🚀 Technologien

- **HTML** → Struktur der Webseite  
- **CSS** → Design und Layout  
- **JavaScript** → Interaktivität  
- **API (Pexels)** → Dynamische Bilder  

---

## 🔍 API Integration

Die Webseite nutzt die **Pexels API**, um Bilder dynamisch zu laden.

### Funktionsweise:
1. Benutzer gibt ein Suchwort ein  
2. JavaScript sendet eine Anfrage an die API  
3. Die API liefert Bilder zurück  
4. Die Bilder werden als Karten angezeigt  

👉 Wichtig:
Die Ergebnisse werden im HTML-Bereich angezeigt:

```html
<div id="results"></div>
