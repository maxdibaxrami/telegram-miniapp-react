import "./style.css";

import ChatLayout from "./layout";
import ChatProfileSection from "@/components/chatPage/chatProfileSection";
import MessageSection from "@/components/chatPage/message";
import ChatInput from "@/components/chatPage/chatInput";
import { Page } from "@/components/Page";

export default function ChatPage() {
  return (

    <Page>
      <ChatLayout>
        <ChatProfileSection />
        <main style={{flex:1, overflow:"auto"}}>
          <MessageSection />
        </main>
        <ChatInput />
    </ChatLayout>
    </Page>

  );
}
