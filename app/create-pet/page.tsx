'use client';
import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Link from "next/link";
import { Home } from "lucide-react";

export default function CreatePetPage() {
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("medium");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSave = () => {
    if (!petName || !imageUrl) {
      alert("Please provide a pet name and image.");
      return;
    }

    localStorage.setItem("petName", petName);
    localStorage.setItem("petBreed", breed);
    localStorage.setItem("petSize", size);
    localStorage.setItem("petWeight", weight);
    localStorage.setItem("petAge", age);
    localStorage.setItem("petGender", gender);
    localStorage.setItem("petImageUrl", imageUrl);

    alert("Pet saved! You're ready to start an adventure 🐾");
    window.location.href = "/start-adventure";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 py-12 px-6 flex flex-col items-center">
      <Link href="/" className="absolute top-6 left-6 z-50">
        <button className="bg-white text-pink-500 hover:text-pink-600 p-3 rounded-full shadow-lg hover:scale-125 transition-all duration-300 ease-in-out hover:animate-bounce cursor-pointer">
          <Home className="w-6 h-6" />
        </button>
      </Link>


      <h1 className="text-4xl font-extrabold text-pink-600 mb-8">
        🐾 Create Your Pet
      </h1>

      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl space-y-6">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Pet Name</label>
          <input
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="w-full border border-gray-500 text-gray-800 placeholder-gray-500 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
            placeholder="E.g. Mochi"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Breed</label>
          <input
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full border border-gray-500 text-gray-800 placeholder-gray-500 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
            placeholder="E.g. Australian Shepherd"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full border border-gray-500 text-gray-800 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-500 text-gray-800 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Weight (lbs)</label>
            <input
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border border-gray-500 text-gray-800 placeholder-gray-500 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
              placeholder="e.g. 65"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Age</label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-500 text-gray-800 placeholder-gray-500 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400"
              placeholder="e.g. 4"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Upload Image</label>
          <UploadButton<OurFileRouter, any>
            endpoint="imageUploader"
            appearance={{
              button: "text-white bg-purple-600 hover:bg-purple-700 font-semibold py-1.5 px-3 text-sm rounded-md",
              allowedContent: "text-gray-800",
              container: "",
            }}
            onUploadBegin={() => console.log("Uploading...")}
            onClientUploadComplete={(res) => {
              if (res && res[0]) {
                setImageUrl(res[0].url);
              }
            }}
            onUploadError={(err) => alert(`Upload error: ${err.message}`)}
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded pet"
              className="mt-4 rounded-xl shadow-lg mx-auto max-h-48"
            />
          )}
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-pink-500 hover:bg-pink-600 transition text-white py-3 rounded-lg font-bold shadow-md"
        >
          Save Pet & Start Adventure →
        </button>
      </div>
    </div>
  );
}
