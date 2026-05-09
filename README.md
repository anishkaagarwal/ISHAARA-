# 🔔 ISHAARA — AI-Powered Kathak Mudra Practice Platform

**ISHAARA** (इशारा, meaning "gesture" in Hindi) is an innovative web application that bridges classical Indian dance with modern AI technology. It provides real-time feedback and cultural education for learning and practicing the 28 classical Hasta Mudras (hand gestures) used in Kathak dance.

---

## ✨ Overview

ISHAARA transforms Kathak learning by combining computer vision, AI-powered pose detection, and rich cultural context into an interactive practice environment. The platform recognizes hand gestures in real-time, provides instant corrections, and educates practitioners about the deep cultural and mythological significance of each mudra.

### Key Features

- **🎥 Real-time Mudra Recognition**: AI-powered pose detection using webcam feed with live landmark tracking
- **📚 Comprehensive Mudra Library**: All 28 classical Hasta Mudras with detailed descriptions, meanings, and cultural context
- **✍️ Instant Feedback & Corrections**: Real-time analysis of hand positioning with actionable guidance
- **🎭 Cultural Education**: Rich contextual information about each mudra's significance in mythology, emotion, and storytelling
- **📊 Practice Analytics**: Session tracking with accuracy metrics, time spent, and historical performance
- **🎨 Beautiful UI**: Culturally-inspired design with saffron (#FF9933) accents, ghungroo decorative elements, and smooth animations

---

## 🏗️ Architecture

### Frontend Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Real-time Communication**: WebSocket connection to backend

### Backend (Integration Required)

The frontend expects a backend service running on `localhost:8000` that provides:

- **REST API**: `/api/mudras` endpoint for mudra data
- **WebSocket Server**: Real-time pose detection and feedback
- **Computer Vision**: Hand landmark detection and mudra classification
- **AI Model**: Trained on classical Kathak mudra positions

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm, yarn, pnpm, or bun
- Webcam for practice mode
- Backend service (see Backend Integration section)

### Installation

```bash
# Clone the repository
git clone https://github.com/anishkaagarwal/ISHAARA-.git
cd ISHAARA-

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Structure

```
ISHAARA-/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── mudras/            # Mudra library page
│   └── practice/          # Practice session page
├── components/            # React components
│   ├── VideoCanvas.tsx    # Webcam feed with overlay
│   ├── MudraCard.tsx      # Current mudra display
│   ├── CorrectionPanel.tsx # Real-time feedback
│   ├── CulturalContext.tsx # Educational content
│   ├── SessionStats.tsx   # Performance analytics
│   └── ...
├── hooks/                 # Custom React hooks
│   ├── useWebSocket.ts    # WebSocket connection
│   ├── useWebcam.ts       # Camera access
│   └── useAudio.ts        # Audio feedback
├── store/                 # Zustand state management
│   └── sessionStore.ts    # Practice session state
├── lib/                   # Utility functions
│   └── overlayRenderer.ts # Canvas drawing utilities
└── public/                # Static assets
```

---

## 🎯 Features Deep Dive

### 1. Interactive Practice Mode

The practice interface provides a complete learning environment:

- **Live Video Feed**: Mirrored webcam display for natural self-view
- **Pose Overlay**: Real-time hand landmark visualization
- **Connection Status**: Live indicator showing backend connectivity
- **Session Controls**: Start/stop practice with error handling

### 2. Mudra Library

Browse and explore all 28 Hasta Mudras:

- **Visual Cards**: Each mudra with emoji representation and difficulty level
- **Search & Filter**: Find mudras by name, meaning, tags, or difficulty
- **Detailed View**: Modal with complete information including:
  - Sanskrit name and Devanagari script
  - English meaning and translation
  - Classification (Asamyuta/Samyuta)
  - Difficulty level (Beginner/Intermediate/Advanced)
  - Full description and cultural context
  - Usage in performances and storytelling
  - Related tags
- **Direct Practice**: Quick launch to practice any mudra

### 3. Real-time Feedback System

AI-powered corrections delivered through:

- **Visual Overlay**: Colored landmarks showing correct/incorrect positioning
- **Correction Panel**: Specific, actionable guidance (e.g., "Straighten your index finger")
- **Cultural Context**: Learn what each mudra represents while practicing
- **Session History**: Track which mudras you've attempted

### 4. Session Analytics

Comprehensive practice tracking:

- **Accuracy Score**: Real-time performance metrics
- **Time Tracking**: Session duration and time per mudra
- **Historical Data**: Previous attempts and improvement tracking
- **Visual Indicators**: Color-coded feedback (green/yellow/red)

---

## 🎨 Design Philosophy

ISHAARA's visual language draws from classical Indian aesthetics:

- **Color Palette**: 
  - Saffron (#FF9933) — primary accent, representing cultural heritage
  - Deep blacks (#030303, #0A0A0A) — elegant dark background
  - Jade (#00C9A7) — success indicators
  - Coral (#E8335A) — alerts and live indicators
- **Typography**: 
  - Display font for headings (elegant, traditional feel)
  - Mono font for technical elements (modern, precise)
  - Body font for readable content
- **Decorative Elements**: Ghungroo (traditional dance bells) motifs
- **Animations**: Smooth, culturally-respectful transitions using Framer Motion

---

## 🔌 Backend Integration

The frontend communicates with a backend service via:

### REST API

```typescript
GET /api/mudras
// Returns array of mudra objects
[
  {
    name: "Pataka",
    devanagari: "पताक",
    meaning: "Flag",
    classification: "Asamyuta Hasta",
    description: "...",
    cultural_context: "...",
    usage: "...",
    difficulty: "beginner",
    tags: ["basic", "flag", "flat-palm"]
  }
]
```

### WebSocket Protocol

```typescript
// Client → Server (binary frame)
Blob (JPEG image from webcam, ~10-15 FPS)

// Server → Client (JSON)
{
  landmarks: [[x, y, z], ...],      // Hand keypoints
  detected_mudra: "Pataka",         // Classified mudra
  confidence: 0.95,                 // Model confidence
  corrections: [
    "Extend your thumb slightly",
    "Keep fingers together"
  ],
  accuracy: 87,                     // 0-100 score
  cultural_note: "..."             // Optional context
}
```

---

## 📖 The 28 Hasta Mudras

ISHAARA covers all classical single-hand (Asamyuta) mudras:

**Beginner**: Pataka, Tripataka, Ardhapataka, Kartarimukha, Mayura, Ardhachandra, Arala, Shukatunda

**Intermediate**: Mushti, Shikhara, Kapittha, Katakamukha, Suchi, Chandrakala, Padmakosha, Sarpashire

**Advanced**: Mrigashirsha, Simhamukha, Kangula, Alapadma, Chatura, Bhramara, Hamsasya, Hamsapaksha, Sandamsha, Mukula, Tamrachuda, Trishula

Each mudra is carefully documented with:
- Mythological references (e.g., Trishula represents Lord Shiva's trident)
- Emotional expressions (e.g., Ardhachandra conveys moon/beauty/calmness)
- Storytelling applications (e.g., Mayura depicts a peacock)

---

## 🛠️ Development

### Building for Production

```bash
npm run build
npm run start
```

### Code Style

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling consistency

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
```

---

## 🎯 Future Roadmap

- [ ] **Multi-hand (Samyuta) Mudras**: Support for two-handed gestures
- [ ] **Audio Feedback**: Spoken corrections and guidance
- [ ] **Video Tutorials**: Embedded demonstrations for each mudra
- [ ] **Performance Mode**: Record and review full dance sequences
- [ ] **Mobile App**: Native iOS/Android applications
- [ ] **Social Features**: Share progress, compete with friends
- [ ] **Gamification**: Achievements, badges, and level progression
- [ ] **Offline Mode**: Practice without internet connection
- [ ] **Multiple Dance Forms**: Expand beyond Kathak (Bharatanatyam, Odissi, etc.)

---

## 🤝 Contributing

Contributions are welcome! Areas where you can help:

1. **Backend Development**: Build the AI model and WebSocket server
2. **UI/UX Improvements**: Enhance the practice experience
3. **Content**: Add more cultural context and mudra variations
4. **Documentation**: Improve setup guides and API documentation
5. **Testing**: Add unit and integration tests
6. **Accessibility**: Improve keyboard navigation and screen reader support

---

## 📜 Cultural Respect

ISHAARA is built with deep respect for the classical arts of India. The platform aims to:

- **Preserve Tradition**: Maintain authentic mudra forms and cultural context
- **Educate**: Share the rich history and mythology behind each gesture
- **Empower Learning**: Make traditional knowledge accessible to all
- **Honor Heritage**: Present information with cultural sensitivity

We encourage users to supplement AI-assisted learning with guidance from qualified Kathak teachers and traditional learning methods.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Classical Kathak gurus and practitioners who preserve this art form
- The broader Indian classical dance community
- Open source libraries and frameworks that make this possible
- Contributors and supporters of ISHAARA

---

## 📞 Contact

**Project Maintainer**: Anishka Agarwal  
**GitHub**: [@anishkaagarwal](https://github.com/anishkaagarwal)

---

<div align="center">

**Built with ❤️ for preserving and promoting Indian classical arts**

🔔 **इशारा — Ishaara** 🔔

*"Where tradition meets technology"*

</div>

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
