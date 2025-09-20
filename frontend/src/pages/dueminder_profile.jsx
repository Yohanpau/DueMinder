import React, { useEffect, useState } from "react";
import DueMinderAIUI from "./dueminder.conversation";
import ProfileUploader from "./upload_image";

function Profile() {
  // AI
  const [chatbotOpen, setChatbotOpen] = useState(false);
  
  // Saves and edit the placed budget by the user
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authenticatedUser"))
  );
  const [budget, setBudget] = useState(user?.budget || "");
  const [isEditing, setIsEditing] = useState(!user?.budget); // Editable if no budget yet

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleBlur = () => {
    if (budget !== "") {
      const updatedUser = { ...user, budget };
      localStorage.setItem("authenticatedUser", JSON.stringify(updatedUser));
      localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    }
  };

  // Saves all the users auth information
  //For editing full name
  const [fullName, setFullName] = useState(user?.name || "");
  const [isEditingName, setIsEditingName] = useState(!user?.name);

  const handleNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleNameSave = () => {
    if (fullName.trim() !== "") {
      const updatedUser = { ...user, name: fullName };
      localStorage.setItem("authenticatedUser", JSON.stringify(updatedUser));
      localStorage.setItem(updatedUser.email, JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditingName(false);
    }
  };

  // Handles password changes 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = () => {
    const updatedUser = { ...user, password: newPassword };
    localStorage.setItem(user.email, JSON.stringify(updatedUser));
    localStorage.setItem("authenticatedUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setNewPassword("");
    setIsModalOpen(false);
    alert("Password updated successfully!");
  };


  return (
    <>
      {/* AI */}
      <DueMinderAIUI
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
      />

      {/* Upper icons */}
      <div className="flex flex-row justify-between align-middle w-[100%] mt-[2em] mb-[1em] text-white">
        {/* Back to settings */}
        <a
          href="/settings"
          className="flex flex-row align-middle justify-center w-fit h-fit gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <p className="mt-[-0.2em]">Back to Settings</p>
        </a>

        {/* AI icon */}
        <button onClick={() => setChatbotOpen(!chatbotOpen)}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="active:scale-90 transition-transform duration-300 ease-in-out"
          >
            <path
              d="M33 14c3 10 4.5 10 12 12-7.5 2-9 2-12 12-3-10-4.5-10-12-12 7.5-2 9-2 12-12z"
              fill="#FFF6F2"
            />
            <path
              d="M18 36c1.2 4 1.6 3.8 5.2 5.2-3.6 1.4-4 1.4-5.2 5.2-1.2-3.8-1.6-3.8-5.2-5.2 3.6-1.4 4-1.4 5.2-5.2z"
              fill="#FFF6F2"
            />
            <path
              d="M48 8c0.6 4 1.6 3.8 5.2 5.2-3.6 1.4-4 1.4-5.2 5.2-1.2-3.8-1.6-3.8-5.2-5.2 3.6-1.4 4-1.4 5.2-5.2z"
              fill="#FFF6F2"
            />
          </svg>
        </button>
      </div>

      {/* Profile edit section */}
      <div className="text-[#e7deda] flex flex-col gap-[5%] w-[100%] h-[80vh]">
        {/* Title */}
        <h2 className="text-[1.5em] font-bold">Profile</h2>
        {/* User profile */}
        <div>
          <div className="flex justify-center items-center">
            <ProfileUploader />
          </div>
        </div>

        {/* Profile edit and input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem("userBudget", JSON.stringify(budget));
            alert("Saved!");
          }}
          className="flex flex-col items-center justify-center gap-8 text-[#e7deda]"
        >
          <div className="flex flex-col w-[100%] text-[1.1rem] gap-[1.063em]">
            {/* Budget field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="budget" id="budget" className="text-[#FE7531]">
                Budget
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  placeholder="How much is your budget?"
                  name="budget"
                  id="budget"
                  required
                  value={budget}
                  onChange={handleBudgetChange}
                  onBlur={handleBlur}
                  disabled={!isEditing}
                  className={`w-[100%] h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent border-[#FE7531] border-[0.063em] ${
                    !isEditing ? "text-[#a1a1a1] cursor-not-allowed" : ""
                  }`}
                />
                {!isEditing && (
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="flex items-center justify-center text-[#e7deda] active:bg-[#5050505e] rounded-full p-1 active:text-[#e7deda] transition-transform duration-300 ease-in-out absolute right-[4.5%] top-[17%]"
                    aria-label="Edit"
                  >
                    {/* Pencil SVG Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Full name field */}
            <div className="flex flex-col gap-1 text-[1.1rem]">
              <label htmlFor="name" id="name" className="text-[#FE7531]">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={handleNameChange}
                  onBlur={handleNameSave}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNameSave();
                    }
                  }}
                  disabled={!isEditingName}
                  placeholder="Enter your full name"
                  name="name"
                  id="name"
                  required
                  className={`w-full h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent border-[#FE7531] border-[0.063em] ${
                    !isEditingName
                      ? "text-[#a5a5a5] cursor-not-allowed"
                      : "text-white bg-transparent"
                  }`}
                />
                {!isEditingName && (
                  <button
                    type="button"
                    onClick={() => setIsEditingName(true)}
                    className="flex items-center justify-center text-[#e7deda] active:bg-transparent rounded-full p-1 active:text-[#e7deda] transition-transform duration-300 ease-in-out absolute right-[4.5%] top-[17%]"
                    aria-label="Edit"
                  >
                    {/* Pencil SVG Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Email field */}
            <div className="flex flex-col gap-1 text-[1.1rem]">
              <label htmlFor="email" id="email" className="text-[#FE7531]">
                Email
              </label>
              <input
                type="text"
                value={user?.email || ""}
                readOnly
                name="email"
                id="email"
                required
                className="h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent text-[#a5a5a5] border-[#FE7531] border-[0.063em] cursor-not-allowed"
              />
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1 text-[1.1rem]">
              <div className="flex flex-row">
                <label
                  htmlFor="password"
                  id="password"
                  className="text-[#FE7531]"
                >
                  Password
                </label>
                <button
                  onClick={() => setIsModalOpen(true)}
                  type="button"
                  className="flex w-[100%] justify-end text-[1rem] underline"
                >
                  Change Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={user?.password || ""}
                  readOnly
                  name="password"
                  id="password"
                  required
                  className="w-[100%] h-[2.813em] p-[0.875em] rounded-[0.625em] bg-transparent text-[#a5a5a5] border-[#FE7531] border-[0.063em] cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Modal for changing password */}
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-[#00000099] flex items-center justify-center z-50">
              <div className="bg-[#111] p-6 rounded-xl w-[90%] max-w-md text-[#e7deda] relative">
                <h2 className="text-xl font-bold mb-4 text-[#FE7531]">
                  Change Password
                </h2>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full p-2 mb-4 rounded bg-transparent border border-[#FE7531]"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded bg-gray-600 active:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasswordChange}
                    className="px-4 py-2 rounded bg-[#FE7531] font-bold"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          <button className="h-[2.813em] bg-[#FE7531] w-[100%] rounded-full font-bold mb-10">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
