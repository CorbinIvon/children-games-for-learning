# Technical Stack & Guidelines

## Tech Stack

- **Framework**: [React](https://react.dev/) (v18+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Audio**: Native Web Audio API (or `use-sound` hook for simplicity).

## Development Guidelines

### Tailwind CSS & Retro Theme

We do not use standard Tailwind colors. We use a restricted palette defined in `tailwind.config.js` to mimic EGA/VGA colors.

**Common Utilities:**

- `border-4 border-black`: Thick borders are mandatory for windows and buttons.
- `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`: Hard drop shadows (no blur) for depth.
- `font-retro`: Custom font family (e.g., "Press Start 2P" or similar sans-serif).

### Component Structure

All components should be functional components using Hooks.

```jsx
// Example RetroButton
const RetroButton = ({ children, onClick, color = "blue" }) => (
  <button
    onClick={onClick}
    className={`bg-${color}-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none p-4 font-bold text-white`}
  >
    {children}
  </button>
);
```

### State Management

- Use `useState` for local component state.
- Use `useContext` for global settings (Volume, Theme, Difficulty).

### Audio

- Audio is CRITICAL. Every button press needs a "click" or "blip" sound.
- Educational feedback needs voiceovers.
- **File Formats**: Use `.mp3` or `.ogg` for broad compatibility.

### Assets

- Store images in `src/assets/images`.
- Store sounds in `src/assets/sounds`.
- Prefer SVG for UI icons (Lucide) but stick to pixel-art or simple vector illustrations for game content.
