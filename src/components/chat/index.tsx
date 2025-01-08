import ChatList from "./chatList";
import MatchList from "./matchList";

const ChatPage = () => {

  return (
    <div
      className="w-full h-full"
      style={{
        overflow: "scroll",
        paddingTop: "4.5rem",
        paddingBottom: "6rem",
        paddingLeft:"0.5rem",
        paddingRight:"0.5rem",
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
