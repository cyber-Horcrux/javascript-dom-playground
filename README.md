# 🧪 JavaScript DOM Playground

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Beginner Friendly](https://img.shields.io/badge/Beginner-Friendly-brightgreen?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red?style=for-the-badge)
![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

A small collection of hands-on JavaScript DOM exercises, built into one
clean single-page app. Each "module" on the page focuses on a different
core skill: selecting elements, listening for events, running timers, and
handling forms — all without a single framework or library.

## ✨ Features

- **Color Switcher** — set text color manually via buttons, pick a random
  color, or start an automatic color cycle (play/pause) built with
  `setInterval()` / `clearInterval()`, plus a running color history.
- **Click Counter** — a live counter with a reset button and a keyboard
  shortcut (<kbd>C</kbd>), with a pop-up alert every 10 clicks.
- **Greeting Form** — captures a name on submit, validates it isn't empty,
  and renders a personalized greeting without reloading the page.
- **Activity Log** — a live console-style feed at the bottom of the page
  that echoes every action above as it happens, so you can watch event
  listeners fire in real time.
- **Dark / light mode** toggle, fully responsive layout, and smooth
  hover/transition animations throughout.

## 🛠 Technologies used

- **HTML5** — semantic structure
- **CSS3** — custom properties, Flexbox, Grid, responsive design
- **Vanilla JavaScript (ES6+)** — no frameworks, no build tools

## 📁 Project structure

```
JavaScript-DOM-Practice/
│
├── index.html          # Page markup for all four modules
├── style.css            # Design system, layout, dark mode, animations
├── script.js             # All DOM logic, organized by module
│
├── assets/                # Reserved for future images/icons
├── screenshots/
│     └── project-preview.png   # Add your own screenshot here
│
├── README.md
├── LICENSE
├── .gitignore
└── CONTRIBUTING.md
```

## 🚀 How to run

No build tools or dependencies required.

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/JavaScript-DOM-Practice.git
   ```
2. Open `index.html` in your browser — that's it.

   Or, for auto-reload while editing, serve it locally with a tool like the
   VS Code "Live Server" extension.

## 🎯 Learning objectives

This project was built to practice:

- DOM manipulation (`textContent`, `innerHTML`, `style`)
- Event listeners (`click`, `submit`, `keydown`)
- Functions and variable scope
- Timers: `setInterval()` and `clearInterval()`
- Working with forms and `preventDefault()`
- `querySelector()` / `querySelectorAll()`
- Basic input validation and safe HTML rendering

## 🔮 Future improvements

- [ ] Persist dark mode preference and counter value with `localStorage`
- [ ] Add unit tests for the pure logic (color picking, validation)
- [ ] Add a color picker (`<input type="color">`) alongside the presets
- [ ] Animate the activity log with entry/exit transitions
- [ ] Add an undo button for the color history
- [ ] Break `script.js` into ES modules, one per feature
- [ ] Add a favicon and Open Graph preview image
- [ ] Add basic accessibility testing (axe-core) to the workflow

## 📸 Screenshots

_Add a screenshot to `screenshots/project-preview.png` — see the note in that folder._

```
![App preview](screenshots/project-preview.png)
```

## 👤 Author

**Wasiq**
Software Engineering student, learning JavaScript one small project at a time.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
