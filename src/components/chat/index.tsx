import ChatFiltermenu from "./chatFilterMenu";
import ChatList from "./chatList";
import MatchList from "./matchList";

const ChatPage = () => {
  const safeAreaTop1 = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--tg-viewport-height')) || 0;
  const safeAreaTop2 = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--tg-viewport-stable-height')) || 0;
  const finalSafeArea = safeAreaTop1 - safeAreaTop2

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
      <div style={{paddingBottom:"0.5rem"}} className="flex justify-between items-center">
        <span style={{fontWeight:"500"}}  className="text-large text-default-600">Matches {safeAreaTop1} , {safeAreaTop2}, {finalSafeArea}</span>
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
