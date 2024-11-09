"use client";

import ChatLayout from "./layout";

import "./style.css";

import ChatProfileSection from "@/components/chatPage/chatProfileSection";
import MessageSection from "@/components/chatPage/message";
import ChatInput from "@/components/chatPage/chatInput";

export default function ChatPage() {
  return (

    <ChatLayout>
      <header className="bg-blue-500 text-white">
        <ChatProfileSection />
      </header>


      <main className="flex-grow overflow-y-auto bg-gray-100">
      <MessageSection />
      </main>

      <footer className="bg-white border-t">
        <form className="flex">
          <ChatInput />
        </form>
      </footer>

  </ChatLayout>

  );
}
