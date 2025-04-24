'use client';

import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const START_STORY = gql`
  mutation StartStory($input: StartStoryInput!) {
    startStory(input: $input) {
      caption
      imagePrompt
      imageUrl
      choices {
        text
        consequence
      }
    }
  }
`;

export default function StartAdventurePage() {
  const [petName, setPetName] = useState('Milo');
  const [imageUrl, setImageUrl] = useState('');
  const [adventureType, setAdventureType] = useState('wholesome');
  const [storyLength, setStoryLength] = useState('short');
  const [customPrompt, setCustomPrompt] = useState('');
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [startStory, { data, loading, error }] = useMutation(START_STORY, {
    onCompleted: (response) => {
      setIsStarted(true);
      setSceneIndex(0);
      setIsComplete(false);
    }    
  });
  

  useEffect(() => {
    const savedName = localStorage.getItem('petName') ?? 'Milo';
    const savedImage = localStorage.getItem('imageUrl') ?? 'https://placedog.net/500';
    setPetName(savedName);
    setImageUrl(savedImage);
  }, []);

  const handleStart = () => {
    const uploadedImage = localStorage.getItem('imageUrl');
    const fallbackImage = `https://placedog.net/500?id=${Math.floor(Math.random() * 1000)}`;

    const input = {
      petName,
      imageUrl: uploadedImage || fallbackImage,
      breed: localStorage.getItem('petBreed') ?? '',
      size: localStorage.getItem('petSize') ?? '',
      weight: localStorage.getItem('petWeight') ?? '',
      age: localStorage.getItem('petAge') ?? '',
      gender: localStorage.getItem('petGender') ?? '',
      adventureType,
      storyLength,
      customPrompt,
    };

    startStory({ variables: { input } });
  };

  const handleChoice = () => {
    if (sceneIndex < (data?.startStory?.length || 0) - 1) {
      setSceneIndex(sceneIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const currentScene = data?.startStory?.[sceneIndex];

  useEffect(() => {
    console.log("🎯 currentScene:", currentScene);
  }, [currentScene]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 py-12 px-6 flex flex-col items-center">
      <Link href="/" className="absolute top-6 left-6 z-50">
        <button className="bg-white text-pink-500 hover:text-pink-600 p-3 rounded-full shadow-lg hover:scale-125 transition-all duration-300 ease-in-out hover:animate-bounce cursor-pointer">
          <Home className="w-6 h-6" />
        </button>
      </Link>

      <h1 className="text-4xl font-extrabold text-pink-600 mb-8">🐶 Start a New Petventure</h1>

      <div className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-xl space-y-6 relative">
        {!isStarted && (
          <>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Pet's Name</label>
              <input
                className="w-full border border-gray-500 text-gray-800 placeholder-gray-500 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Enter your pet's name"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Adventure Type</label>
              <select
                value={adventureType}
                onChange={(e) => setAdventureType(e.target.value)}
                className="w-full border border-gray-500 text-gray-800 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
              >
                <option value="wholesome">Wholesome</option>
                <option value="mystery">Mystery</option>
                <option value="fantasy">Fantasy</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="spooky">Spooky</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Story Length</label>
              <select
                value={storyLength}
                onChange={(e) => setStoryLength(e.target.value)}
                className="w-full border border-gray-500 text-gray-800 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
              >
                <option value="short">Short (2–3 scenes)</option>
                <option value="medium">Medium (4–6 scenes)</option>
                <option value="long">Long (7+ scenes)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Custom Prompt (Optional)</label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., Milo finds a glowing bone buried in the backyard..."
                className="w-full border border-gray-500 text-gray-800 placeholder-gray-500 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 resize-none"
              />
            </div>

            <button
              onClick={handleStart}
              className="w-full bg-pink-500 hover:bg-pink-600 transition text-white py-3 rounded-lg font-bold shadow-md"
            >
              Start Adventure →
            </button>
          </>
        )}

        {loading && (
          <div className="fixed inset-0 z-50 bg-white/90 flex items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <DotLottieReact src="/animations/dog-loader.lottie" loop autoplay style={{ width: 400, height: 400 }} />
              <p className="mt-6 text-pink-600 text-xl font-semibold animate-pulse">Crafting your pet’s legendary tale... 🐾✨</p>
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-center">Something went wrong. Please try again.</p>}

        {!isComplete && currentScene && isStarted && (
          <div className="space-y-6 text-center">
            <img
              src={currentScene.imageUrl}
              alt="Scene illustration"
              className="w-full max-w-2xl rounded-xl mx-auto shadow-lg"
            />
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">{currentScene.caption}</p>

            <div className="space-y-4 mt-4 max-w-md mx-auto">
              {currentScene.choices.map((choice: any, index: number) => (
                <button
                  key={index}
                  onClick={handleChoice}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold shadow transition"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {isComplete && (
          <div className="text-center space-y-6">
            <DotLottieReact className="py-2" src="/animations/alpaca-loader.lottie" loop autoplay style={{ width: 400, height: 400 }} />
            <h2 className="text-2xl font-bold text-pink-600">Your adventure has ended! 🎉</h2>
            <p className="text-gray-700">But every end is a new beginning...</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <button
                onClick={() => {
                  setIsStarted(false);
                  setIsComplete(false);
                  setCustomPrompt('');
                }}
                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg shadow"
              >
                Start New Adventure
              </button>
              <Link href="/" className="inline-block">
                <button className="bg-white border border-pink-400 text-pink-600 hover:bg-pink-50 py-2 px-6 rounded-lg shadow">
                  Return Home
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
