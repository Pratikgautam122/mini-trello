# NovaBoard — Mini Trello

A small Kanban-style task board built with React + Vite, inspired by Trello.

## Features

- Three columns: **To Do**, **In Progress**, **Done**
- Add, edit, and delete tasks
- Drag and drop tasks between columns
- Live search across task titles and descriptions
- Per-column task counts
- Tasks persist locally in the browser (`localStorage`) — your board survives a refresh
- Responsive layout, keyboard-friendly forms (Esc to cancel)

## Tech stack

- React 18
- Vite
- Plain CSS (no framework)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    Sidebar.jsx
    MainContent.jsx
    BoardColumn.jsx
    TaskCard.jsx
  App.jsx
  data.js
  main.jsx
  styles.css
```

## Author

Pratik Gautam — [github.com/Pratikgautam122](https://github.com/Pratikgautam122)
