'use client';

import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 flex flex-col items-center justify-center px-4 text-center">
      <Link href="/" className="absolute top-6 left-6 z-50">
        <button className="bg-white text-pink-500 hover:text-pink-600 p-3 rounded-full shadow-lg hover:scale-125 transition-all duration-300 ease-in-out hover:animate-bounce cursor-pointer">
          <Home className="w-6 h-6" />
        </button>
      </Link>
      <Image
        src="/Dogs-Hero.png"
        alt="Silly dog wearing sunglasses"
        width={600}
        height={600}
        className="rounded-xl shadow-lg mb-6"
      />
      <h1 className="text-4xl font-extrabold text-pink-600 mb-4">
        Looking for settings?
      </h1>
      <p className="text-lg text-gray-700 max-w-md mb-6">
        The only setting here is <span className="font-bold text-pink-500">fun</span> 🐾
      </p>
      <Link href="/">
        <button className="bg-pink-500 hover:bg-pink-600 transition text-white py-2 px-6 rounded-lg font-semibold shadow-md">
          Click here to get back to the adventure
        </button>
      </Link>
    </div>
  );
}