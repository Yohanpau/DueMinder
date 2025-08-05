import React, { useState } from "react";

export default function DueMinderAIUI({ isOpen, onClose, bills, budget }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello, how can I assist you with your bills?" },
  ]);
  const [input, setInput] = useState("");

  const generatePrioritySuggestions = () => {
    if (!bills || bills.length === 0) return "You have no bills set yet.";

    const high = bills.filter(bill => bill.priority === "High");
    const medium = bills.filter(bill => bill.priority === "Medium");
    const low = bills.filter(bill => bill.priority === "Low");

    const tips = [];

    if (high.length > 0) {
      tips.push(
        `You have ${high.length} high-priority bills like ${high.map(b => b.name).join(", ")}. Try to pay these first to avoid penalties.`
      );
    }

    if (medium.length > 0) {
      tips.push(
        `You have ${medium.length} medium-priority bills. It's good to pay them on time but they may have some flexibility.`
      );
    }

    if (low.length > 0) {
      tips.push(
        `You have ${low.length} low-priority bills like ${low.map(b => b.name).join(", ")}. Consider deferring these if you're short on budget.`
      );
    }

    return tips.join("\n\n");
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      let aiReply = "";

      if (
        input.toLowerCase().includes("suggestion") ||
        input.toLowerCase().includes("tip")
      ) {
        aiReply = generatePrioritySuggestions();
      } else {
        const response = await fetch("http://localhost:5000/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: input, bills, budget }),
        });

        const data = await response.json();
        aiReply = data.reply || "⚠️ No reply.";
      }

      const aiMessage = { role: "ai", text: aiReply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Failed to fetch response from server." },
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-24 left-6 w-[88%] h-[85%] bg-[#111111] border border-[#464646] rounded-xl shadow-xl flex flex-col z-50">
      <div className="flex-1 overflow-y-auto p-3 text-[#e7deda] space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "ai" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`rounded-xl px-3 py-2 max-w-[70%] ${
                msg.role === "ai"
                  ? "bg-[#FE7531] text-[#e7deda]"
                  : "border border-[#FE7531] text-[#FE7531]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center border-[0.063em] m-6 border-[#FE7531] p-2 rounded-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask any questions!"
          className="flex-1 p-2 bg-transparent text-[#e7deda] outline-none text-[0.875rem]"
        />

        <button onClick={handleSend} className="mr-3 text-[#FE7531]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#e7deda"
            className="w-5 h-5 rotate-45 active:rotate-0 transition-transform duration-300 ease-in-out"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
