'use client';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="relative w-full text-gray-800 font-sans">

      {/* Hero Section */}
      <section className="relative h-screen w-full text-white overflow-hidden">
        <Image
          src="/Hero-Banner.png" // <-- Replace with your first cartoon pets background filename
          alt="Pet adventure background"
          layout="fill"
          objectFit="cover"
          quality={90}
          priority
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">🐾 Welcome to Petventures</h1>
          <p className="mb-8 text-lg sm:text-xl max-w-xl drop-shadow-md">
            Turn your pet into the hero of their own AI-powered comic adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/start-adventure")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md transition"
            >
              Start Adventure
            </button>
            <button
              onClick={() => router.push("/create-pet")}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg shadow-md transition"
            >
              Create Your Pet
            </button>
            <button
              onClick={() => router.push("/settings")}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg text-lg shadow-md transition"
            >
              Settings
            </button>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="relative w-full h-screen text-black text-center px-6 py-20">
        <div className="absolute inset-0 bg-pink-100 z-10" />

        <div className="relative z-20 max-w-2xl mx-auto flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold mb-4">🌟 What Inspired This Project</h2>
          <p className="text-lg">
            Petventures was inspired by the love and imagination sparked by our own furry friends.
            Combining storytelling with playful art and AI, this project brings pets to life in a way that’s heartwarming, surprising, and fun.
          </p>
        </div>
      </section>



      {/* About Developer Section */}
      <section className="relative w-full h-screen text-white text-center px-6 py-20">
        <Image
          src="/Author-Hero.png"
          alt="About the Developer background"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="relative z-20 max-w-2xl mx-auto flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold mb-4">👋 About the Developer</h2>
          <p className="text-lg">
            Hi! I'm Jason Tseng, a frontend engineer who loves building joyful, story-driven experiences.
            This app began as a creative exploration with my dogs, and turned into a passion project blending
            web tech, storytelling, and a bit of magic 🐶✨
          </p>
        </div>
      </section>


      {/* Back to Top Button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
          aria-label="Back to Top"
        >
          ↑
        </button>
      )}
    </main>
  );
}
