import { useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";
import "./css_folder/chaticon.css"; 

export default function ChatIcon() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/chat")}
      className="chat-icon"
    >
      <Bot size={42} />
    </div>
  );
}
