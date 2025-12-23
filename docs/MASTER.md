# KiddoQuest Documentation Master File

## Project Overview

**KiddoQuest** (working title) is a web-based educational game suite for children ages 3-6. It captures the nostalgic aesthetic of 1990s PC edutainment titles (EGA/VGA graphics, chunky UI) while utilizing modern web technologies.

## Documentation Index

- **[Technical Stack & Guidelines](./TECH_STACK.md)**: Details on React, Vite, Tailwind usage, and asset management.
- **[Page-Specific Guidelines](./PAGES.md)**: Detailed breakdown of each game module and its specific requirements.

## Core Principles

1. **Retro Aesthetic**: EVERYTHING should look like it belongs in 1995. High contrast, thick borders, pixelated fonts (optional but encouraged), and "clicky" UI.
2. **Child-Friendly**: Big buttons, clear audio feedback, forgiveness in inputs (drag and drop snap-to-target).
3. **Configurable**: Parents should have control via a settings menu (Gear Icon) to toggle sounds, difficulty, or specific learning modes.

## Directory Structure

```filesystem
/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images and Sounds
│   ├── components/  # Shared UI (RetroButton, GameWindow)
│   ├── games/       # Specific Game Modules (Keyboard, Alphabet, etc.)
│   ├── styles/      # Tailwind & Global CSS
│   ├── App.jsx      # Main Entry / Router
│   └── main.jsx     # Root
├── docs/            # You are here
└── README.md        # GitHub entry
```
