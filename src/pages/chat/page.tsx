import "./style.css";

import ChatLayout from "./layout";
import ChatProfileSection from "@/components/chatPage/chatProfileSection";
import MessageSection from "@/components/chatPage/message";
import ChatInput from "@/components/chatPage/chatInput";

export default function ChatPage() {
  return (

    <ChatLayout>
      <ChatProfileSection />
      <main className="flex flex-grow overflow-y-auto">
        <MessageSection />
      </main>
      <ChatInput />
  </ChatLayout>

  );
}
