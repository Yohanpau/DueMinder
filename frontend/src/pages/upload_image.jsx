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
      <div className="w-[7.5em] h-[7.5em] rounded-full bg-[#222222] border border-[#FE7531] flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[#FE7531] text-4xl">👤</span>
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
          className="px-4 py-2 text-sm rounded-full cursor-pointer bg-[#FE7531] text-[#e7deda] active:border active:border-[#FE7531] active:text-[#e7deda] transition"
        >
          Upload Image
        </label>

        {/* Removes the photo */}
        {image && (
          <button
            onClick={() => setImage(null)}
            className="px-4 py-2 text-sm border border-[#FE7531] text-[#FE7531] rounded-full hover:bg-[#FE7531] hover:text-[#e7deda] transition"
          >
            Remove Photo
          </button>
        )}
      </div>
    </div>
  );
}
