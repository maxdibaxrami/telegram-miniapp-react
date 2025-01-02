import ChatList from "./chatList";
import MatchList from "./matchList";

const ChatPage = () => {

  return (
    <div
      className="w-full h-full px-6"
      style={{
        overflow: "scroll",
        paddingTop: "4.5rem",
        paddingBottom: "6rem",
        zIndex: 5,
      }}
      id="chatScrollcontainer"
    >

      <MatchList/>

      
      <ChatList />
      
    </div>
  );
};

export default ChatPage;
