"use client";

import ChatLayout from "./layout";

import "./style.css";

import ChatProfileSection from "@/components/chatPage/chatProfileSection";
import MessageSection from "@/components/chatPage/message";
import ChatInput from "@/components/chatPage/chatInput";

export default function ChatPage() {
  return (

    <ChatLayout>
      <header className="flex">
        <ChatProfileSection />
      </header>


      <main className="flex flex-grow overflow-y-auto">
        <MessageSection />
      </main>

      <footer>
        <form className="flex">
          <ChatInput />
        </form>
      </footer>

  </ChatLayout>

  );
}
