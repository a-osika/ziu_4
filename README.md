# Aplikacja To-Do

Aplikacja webowa do zarządzania zadaniami z dashboardem,
pełnym CRUD-em zadań. Dane obsługuje mock API (MSW), więc aplikacja działa w całości
po stronie przeglądarki.

## 🔗 Demo

👉 **[Otwórz demo](https://ziuproject.vercel.app/)**

## ✨ Funkcje

- Pulpit z podsumowaniem zadań i ostatnią aktywnością
- Tworzenie, edycja i usuwanie zadań (usuwanie z potwierdzeniem)
- Oznaczanie zadań jako ukończone
- Nadawanie priorytetów i terminów realizacji
- Szybkie wyszukiwanie i filtrowanie zadań (wszystkie / aktywne / ukończone)
- Czytelne komunikaty, gdy w formularzu coś jest nie tak
- Tryb jasny i ciemny
- Wygodna obsługa na telefonie i na komputerze
- Pełna obsługa z klawiatury i czytelne kontrasty
- Zakładanie konta w prostych krokach

## 🛠️ Technologie

- **React 18** + **TypeScript**
- **Vite** — bundler i serwer deweloperski
- **Material UI (MUI v9)** — komponenty, ikony, date pickers
- **React Router v7** — routing
- **React Hook Form** + **Zod** — formularze i walidacja
- **MSW (Mock Service Worker)** — mock API (GET / POST / PUT / DELETE)
- **Emotion** — silnik stylów MUI
- **dayjs** — obsługa dat
- **Prettier** — formatowanie kodu

## 🚀 Uruchomienie

Wymagany **Node.js 18+**.

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/a-osika/ziu_4.git
cd ziu_4

# 2. Zainstaluj zależności
npm install

# 3. Uruchom w trybie deweloperskim
npm run dev
```
