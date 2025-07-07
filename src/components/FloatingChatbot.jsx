// FloatingChatbot.jsx
import React, { useState } from "react";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const reply = getBotReply(input);
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    }, 500);
  };

  const getBotReply = (msg) => {
    const lower = msg.toLowerCase();

    if (lower.includes("appointment")) return "You can book an appointment from the login page.";
    if (lower.includes("timing") || lower.includes("hours")) return "We are open from 9 AM to 7 PM, Monday to Saturday.";
    if (lower.includes("location") || lower.includes("where")) return "We are located at 123 Smile Street, Chennai.";
    if (lower.includes("dentist") || lower.includes("doctor")) return "We have specialists for implants, root canals, pediatric care, and more!";
    if (lower.includes("insurance")) return "Yes, we accept most major insurance providers.";
    if (lower.includes("contact") || lower.includes("phone")) return "📞 +91 98765 43210";

    return "I'm sorry, I didn't understand that. Could you please rephrase?";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="bg-primary text-white p-3 font-semibold flex justify-between items-center">
            <span>ENTNT Chatbot</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm p-2 rounded max-w-xs ${
                  m.sender === "bot"
                    ? "bg-blue-100 text-left text-gray-800"
                    : "bg-green-100 text-right self-end"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="bg-primary text-white px-3 rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-blue-600"
          title="Chat with us"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default FloatingChatbot;
