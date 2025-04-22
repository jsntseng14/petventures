# 🐾 Petventures: AI-Powered Pet Adventure Story Generator

**Petventures** is a fun and whimsical web app that lets you create custom AI-generated adventure stories for your pets! Upload your furry friend's photo, choose their personality and adventure style, and dive into a world of animated tales — complete with illustrated scenes and interactive choices.

---

## ✨ Features

- 🐶 Upload your pet's photo
- ✍️ Customize your pet's name, breed, age, and personality
- 🔮 Choose adventure types like Mystery, Fantasy, Sci-Fi, Spooky, or Wholesome
- 📚 Set story length (Short, Medium, Long)
- 💬 Optional custom prompt to guide your adventure
- 🎨 AI-generated story scenes and illustrations
- 🧭 Interactive choices that shape the journey
- 🐾 Animated loader and playful UI experience

---

## 🛠 Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **State Management**: React Hooks, localStorage
- **Backend**: Apollo Server (GraphQL), Node.js, OpenAI API
- **Media Handling**: UploadThing for photo uploads, DALL·E for image generation
- **Animation**: Lottie React for loading animations

---

## 🚀 Getting Started

1. **Clone the repo**
```bash
git clone https://github.com/your-username/petventures.git
cd petventures
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
Create a `.env.local` file in the root:
```
OPENAI_API_KEY=your-openai-api-key
UPLOADTHING_SECRET=your-uploadthing-secret
```

4. **Run the app locally**
```bash
npm run dev
```

---

## 📂 Folder Structure

```
petventures/
├── app/                  # Next.js pages and layout
├── components/           # Reusable UI components
├── public/animations     # Lottie animations
├── server/               # Apollo Server + GraphQL schema + resolvers
│   └── src/
│       ├── schema/       # typeDefs
│       ├── resolvers.ts  # GraphQL resolvers
│       └── ...
├── styles/               # Tailwind global styles
└── README.md             # This file
```

---

## 🧪 Future Improvements
- 🐾 Save and share full adventures
- 📖 Generate downloadable comic books (PDFs)
- 🐶 Multi-pet support
- 💬 Voice-over narration with ElevenLabs or Play.ht
- 🐱 More character customization (hats, moods, etc)

---

## 💖 Inspiration
This project was inspired by a love for dogs, storytelling, and the power of creative AI. Whether you're here for fun, nostalgia, or just to see your pup in space — welcome to the adventure 🐾

---

## 📸 Demo
Coming soon...

---

## 🐕 Made with love by Jason Tseng
Feel free to connect on [LinkedIn](https://linkedin.com/in/jason-tseng) or check out more projects on [GitHub](https://github.com/jsntseng14)

---

## License
MIT

