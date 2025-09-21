import React, { useState, useEffect } from "react";

export default function ProfileUploader() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setImage(base64);
        localStorage.setItem("profileImage", base64); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Profile Image Circle */}
      <div className="w-[7.5em] h-[7.5em] rounded-full bg-[#222222] border border-[#e7deda] flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-[#FE7531]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5.121 17.804A9.969 9.969 0 0112 15c2.219 0 4.253.722 5.879 1.939M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        )}
      </div>

      {/* Hidden Input + Upload Button */}
      <input
        id="profileUpload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      <div className="flex flex-row gap-2">
        {/* Adds a photo */}
        <label
          htmlFor="profileUpload"
          className="px-4 py-2 text-sm rounded-full cursor-pointer bg-[#FE7531] text-[#e7deda] active:scale-90 transition"
        >
          Upload Image
        </label>

        {/* Removes the photo */}
        {image && (
          <button
            onClick={() => setImage(null)}
            className="px-4 py-2 text-sm border border-[#e7deda] text-[#e7deda] rounded-full active:scale-90 transition"
          >
            Remove Photo
          </button>
        )}
      </div>
    </div>
  );
}
