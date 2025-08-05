import React, { useEffect, useState } from "react";
import DueMinderAIUI from "./dueminder.conversation";
import emailjs from "emailjs-com";
import EmailReminderHandler from "./EmailReminderHandler";

function Settings() {
  // AI
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [isOn, setIsOn] = useState(() => {
    const stored = localStorage.getItem("notificationsEnabled");
    return stored ? JSON.parse(stored) : false;
  });
  const [userEmail, setUserEmail] = useState("");
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const storedBills = localStorage.getItem("bills");
    if (storedBills) {
      setBills(JSON.parse(storedBills));
    }
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const toggleNotifications = () => {
    const updated = !isOn;
    setIsOn(updated);
    localStorage.setItem("notificationsEnabled", JSON.stringify(updated));
  };

  console.log("userEmail state:", userEmail);

  const sendReminderEmail = (bill, email) => {
    console.log("Sending to:", email);
    const templateParams = {
      email: userEmail,
      bill_name: bill.name,
      due_date: bill.dueDate,
      amount: bill.amount,
    };

    emailjs.send("service_p4kh83e", "template_knq28ca", templateParams, "muDJ0JS2U8D5QQgZ_")
      .then((res) => console.log("Email sent!", res))
      .catch((err) => console.error("Email error:", err));
  };

  
    useEffect(() => {
      console.log("Loaded bills:", bills);
    }, [bills]);
  
    useEffect(() => {
      console.log("Notifications enabled:", isOn);
    }, [isOn]);
  
    useEffect(() => {
      console.log("Raw stored email:", localStorage.getItem("userEmail"));
    }, []);

  return (
    <>
      {/* AI */}
      <DueMinderAIUI
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
      />

      {/* Upper icons */}
      <div className="flex flex-row justify-between align-middle w-[100%] mt-[2em] mb-[1em] text-white">
        {/* Back to bills */}
        <a
          href="/home"
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
          <p className="mt-[-0.2em]">Back to my bills</p>
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

      {/* Settings list */}
      <div className="text-[#e7deda] flex flex-col gap-[0.6em] w-[100%] h-[80vh] justify-between">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h2 className="text-[1.5em] font-bold">Settings</h2>

          {/* Settings list */}
          <div className="flex flex-col gap-2">
            {/* First settings */}
            <div className="flex flex-row justify-between align-middle w-[100%] bg-[#111111] border-[#464646] border-[0.063em] rounded-[1.25em] p-[1.1em]">
              <div className="flex flex-col">
                <h3 className="text-[1.25rem] font-bold">Profile</h3>
                <p className="text-[0.75rem]">Edit personal information</p>
              </div>
              <a
                href="/profile"
                className="flex items-center justify-center px-4 py-2 text-[#e7deda] rounded-full active:scale-90"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
            {/* Second settings */}
            <div className="flex flex-row justify-between items-center w-full bg-[#111111] border-[#464646] border-[0.063em] rounded-[1.25em] p-[1.1em]">
              <div className="flex flex-col">
                <h3 className="text-[1.25rem] font-bold text-white">
                  Notifications
                </h3>
                <p className="text-[0.75rem] text-gray-400">
                  Receive notifications
                </p>
              </div>
              <div
                onClick={toggleNotifications}
                className={`w-[2.438em] h-[1.25em] flex items-center rounded-full cursor-pointer transition-all duration-300 ${isOn
                  ? "bg-[#FE7531] border-[#FE7531]"
                  : "border-2 border-[#e7deda]"
                  }`}
              >
                <div
                  className={`w-[0.875em] h-[0.875em] bg-[#FE7531] rounded-full shadow-md transform transition-transform duration-300 ${isOn
                    ? "translate-x-5 bg-white"
                    : "translate-x-1 bg-[#e7deda]"
                    }`}
                />
              </div>
            </div>
          </div>
        </div>
        <a
          href="/"
          className="flex align-middle justify-center font-bold underline text-[1.25rem]"
        >
          Sign Out
        </a>
      </div>
    </>
  );
}

export default Settings;
