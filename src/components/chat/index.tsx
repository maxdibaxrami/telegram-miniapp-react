import ChatList from "./chatList";
import MatchList from "./matchList";

const ChatPage = () => {
  return (
    <div
      className="w-full h-full px-6"
      style={{
        overflow: "scroll",
        maxHeight: "100vh",
        paddingTop: "4.5rem",
        paddingBottom: "1rem",
        zIndex:5,
      }}
      id="chatScrollcontainer"
    >
      <div className="flex justify-between py-2 items-center">
        <span className="text-large">Matches</span>
      </div>
      <MatchList />
      <div className="flex justify-between py-2 items-center">
        <span className="text-large">Chat</span>
      </div>

      <ChatList />
      
    </div>
  );
};

export default ChatPage;
