# 🎨 Whimsical Animations Learning Project

> **Learning Web Animation** with Josh Comeau's course "Whimsical Animations"

A React + TypeScript + Vite project focused on exploring creative web animations and interactive experiences. This repository serves as a playground for implementing various animation techniques learned through Josh Comeau's comprehensive animation course.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## 🎯 What You'll Find Here

This project demonstrates various web animation concepts including:

- **CSS Animations & Transitions** - Smooth, performant animations
- **JavaScript Animations** - Dynamic, interactive motion
- **React Animation Patterns** - Component-based animation strategies
- **Performance Optimization** - Techniques for smooth 60fps animations
- **Accessibility Considerations** - Respecting user preferences and motion

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development experience
- **Vite** - Lightning-fast build tool and dev server
- **ESLint** - Code quality and consistency
- **CSS Modules** - Scoped styling for components

## 📚 Learning Resources

- [Josh Comeau's Whimsical Animations Course](https://www.joshwcomeau.com/animation/)
- [React Animation Libraries](https://react-spring.dev/)
- [Web Animation API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [CSS Animation Best Practices](https://web.dev/animations/)

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server with HMR |
| `npm run build`   | Build for production              |
| `npm run preview` | Preview production build          |
| `npm run test`    | Run test suite                    |
| `npm run lint`    | Run ESLint                        |

### ESLint Configuration

For production applications, consider upgrading to type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

### React-Specific Linting

Add React-specific rules with these plugins:

```js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```

## 🎨 Current Animation Implementation

This project features a **talking robot face** with sophisticated mouth animations:

- **SVG-based Robot Face** - Custom drawn robot with eyes, mouth, and teeth
- **Speech-synchronized Animations** - Mouth opens and closes while speaking
- **Teeth Animation** - Individual teeth move realistically during speech
- **Framer Motion Integration** - Smooth, performant animations using React Motion
- **Dual Mode Interface** - Text-to-speech and AI chat functionality
- **Loading States** - Visual feedback during AI processing

## 🤝 Contributing

This is a learning project, but feel free to:

1. Fork the repository
2. Create a feature branch
3. Implement new animation techniques
4. Submit a pull request

## 📄 License

This project is for educational purposes as part of Josh Comeau's animation course.

---

_Happy animating! 🎉_
