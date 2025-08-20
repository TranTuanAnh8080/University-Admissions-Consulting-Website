import React, { useEffect, useState } from "react";
import axios from "axios";
import knowledgeRaw from "../../constants/knowledge.txt?raw";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [knowledge, setKnowledge] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_CHATBOT_API;
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  useEffect(() => {
    setKnowledge(knowledgeRaw);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Tạo lịch sử hội thoại gửi kèm API
      const historyParts = [
        {
          text: "Bạn là một chatbot tư vấn tuyển sinh. Trả lời ngắn gọn, rõ ràng và chỉ dựa trên dữ liệu sau:",
        },
        { text: knowledge },
        { text: "Dưới đây là đoạn hội thoại giữa người dùng và bạn:" },
      ];

      // Chỉ gửi 6 tin nhắn gần nhất để tránh request quá dài
      const recentMessages = [...messages, userMsg].slice(-6);
      recentMessages.forEach((msg) => {
        historyParts.push({
          text: `${msg.sender === "user" ? "Người dùng" : "Chatbot"}: ${
            msg.text
          }`,
        });
      });

      const res = await axios.post(
        URL,
        {
          contents: [
            {
              parts: historyParts,
            },
          ],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const botReply =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Không có phản hồi.";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Lỗi khi gọi API" },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Nút mở chat */}
      {!isOpen && (
        <button
          className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg z-[9999] hover:bg-blue-700"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}

      {/* Hộp chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-1/5 h-2/5 z-[9999] bg-white border border-gray-300 rounded-xl shadow-2xl flex flex-col">
          <div className="bg-blue-600 text-white text-center py-2 rounded-t-xl font-semibold relative">
            🎓 Chatbot Tư vấn
            <button
              className="absolute top-2 right-3 text-white text-sm"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm max-w-[85%] break-words px-3 py-2 rounded-lg ${
                  m.sender === "user"
                    ? "ml-auto bg-blue-100 text-right text-blue-800"
                    : "mr-auto bg-green-100 text-left text-green-800"
                }`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <div className="text-sm text-gray-500 italic">
                <span className="animate-pulse">Đang trả lời...</span>
              </div>
            )}
          </div>

          <div className="flex border-t p-2 gap-2">
            <input
              className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none"
              placeholder="Nhập câu hỏi..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
