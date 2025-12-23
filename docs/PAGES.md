# Page-Specific Guidelines

## 1. Main Menu

- **Route**: `/`
- **Elements**:
  - Title Banner ("KiddoQuest").
  - Play Button (Big, Green).
  - Settings Button (Gear Icon).
  - Exit Button (Red).
- **Behavior**: Background animation (drifting shapes/clouds).

## 2. Keyboard Explore Game

- **Route**: `/games/keyboard`
- **Objective**: Familiarize child with keyboard layout and letter mapping.
- **Layout**:
  - **Top Bar**: Gear Icon (Settings), Home Icon (Exit).
  - **Center**: Visual Feedback Area (Shows the letter pressed, or the image associated).
  - **Bottom**: On-screen Keyboard (QWERTY layout). Mirrors physical key presses.
- **Interaction Loop**:
  1. User presses 'A' (Physical or Click).
  2. On-screen 'A' key lights up (Yellow highlight).
  3. **Visual**: Screen flashes optional color. Center area shows "A" and "Apple".
  4. **Audio**: Chime -> "A" -> "Apple".
- **Settings (Modal)**:
  - [Toggle] Random Colors (Keys change color on press).
  - [Toggle] Read Letter (Voice: "A").
  - [Toggle] Read Word (Voice: "Apple").
  - [Toggle] Show Images (Display Apple image).
  - [Toggle] Background Effects (Screen flash).

## 3. Alphabet Game

- **Route**: `/games/alphabet`
- **Modes**:
  - **Letter Lab**: Click a letter from A-Z grid to hear it.
  - **Matching**: Drag uppercase 'A' to lowercase 'a'.

## 4. Numbers Game

- **Route**: `/games/numbers`
- **Modes**:
  - **Counting**: Display 3 balloons. User clicks '3'.
  - **Order**: Click numbers 1, 2, 3 in order.

## 5. Words Game

- **Route**: `/games/words`
- **Modes**:
  - **First Letter**: "C \_ T" (Show Cat). User picks 'A'.
  - **Word Builder**: Drag letters to slots to build simple words.
