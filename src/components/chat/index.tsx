import ChatFiltermenu from "./chatFilterMenu";
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
        zIndex:5,
      }}
      id="chatScrollcontainer"
    >
      <div style={{paddingBottom:"0.5rem"}} className="flex justify-between items-center">
        <span style={{fontWeight:"500"}}  className="text-large text-default-600">Matches </span>
      </div>
      <MatchList />
      <div className="flex justify-between py-2 items-center">
        <span style={{fontWeight:"500"}} className="text-large text-default-600">Chat</span>
        <ChatFiltermenu/>

      </div>

      <ChatList />
      
    </div>
  );
};

export default ChatPage;
