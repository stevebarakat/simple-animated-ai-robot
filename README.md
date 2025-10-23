# 🤖 Talking Robot App

> **Interactive AI Robot** with Speech Synthesis and Animated Mouth

A React + TypeScript + Vite application featuring a talking robot with synchronized mouth animations, text-to-speech capabilities, and AI chat functionality. This project is part of Josh Comeau's Whimsical Animations course, demonstrating advanced animation techniques with realistic mouth movements synchronized to speech.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

## 🎯 Features

This interactive robot application includes:

- **Animated Robot Face** - SVG-based robot with realistic mouth movements
- **Speech Synchronization** - Mouth opens and closes in sync with speech
- **Text-to-Speech** - Built-in browser speech synthesis
- **AI Chat Integration** - Powered by OpenAI GPT-3.5-turbo
- **Dual Modes** - Speak text directly or ask AI questions
- **Syllable Analysis** - Advanced mouth animation based on speech patterns
- **Loading States** - Visual feedback during AI processing

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development experience
- **Vite** - Lightning-fast build tool and dev server
- **Motion** - Smooth animations and transitions
- **Web Speech API** - Browser-native text-to-speech
- **OpenAI API** - AI chat functionality
- **ESLint** - Code quality and consistency

## 📚 Learning Resources

This project is part of [Josh Comeau's Whimsical Animations Course](https://www.joshwcomeau.com/animation/), which teaches advanced web animation techniques including:

- Speech-synchronized animations
- SVG manipulation and morphing
- Performance optimization for complex animations
- Real-time animation state management

## 🔧 Setup & Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server with HMR |
| `npm run build`   | Build for production              |
| `npm run preview` | Preview production build          |
| `npm run lint`    | Run ESLint                        |

## 🎨 How It Works

### Speech Animation System

The robot's mouth animation is driven by sophisticated text analysis:

1. **Text Analysis** - Breaks down speech into syllables and timing
2. **Speech Synthesis** - Uses browser's Web Speech API for natural voice
3. **Mouth Synchronization** - Animates mouth opening/closing based on speech patterns
4. **AI Integration** - Processes user questions through OpenAI's API

### Component Architecture

- **RobotHead** - SVG-based robot face with animated mouth
- **Controls** - Input interface with dual mode switching
- **useSyllableMouthAnimation** - Custom hook managing mouth animation state
- **textAnalysis** - Utility for analyzing speech timing and patterns

## 🤝 Contributing

Feel free to contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Add new features or improvements
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

_Happy chatting with the robot! 🤖_
