import "./style.css";
import ChatLayout from "./layout";
import ChatProfileSection from "@/components/chatPage/chatProfileSection";
import MessageSection from "@/components/chatPage/message";
import ChatInput from "@/components/chatPage/chatInput";
import { Page } from "@/components/Page";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from '@/api/base';
import { useEffect, useMemo, useState } from "react";
import socketService from '@/socket/socketService'; // Import socket service
import { NotFountChatList } from "@/Icons/notFoundChatList";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Spinner } from "@nextui-org/react";

export default function ChatPage() {

  const { t } = useTranslation();
  

  const [profileDataState, setProfileDataState] = useState(null);
  const [messages, setMessages] = useState([]); // State for messages
  const [loading, setLoading] = useState(true);
  const [inputMessage, setInputMessage] = useState(''); // State for input message
  const [isUserOnline, setIsUserOnline] = useState(false);
  
  const [messageLoading , setMessageLoading ] = useState(true)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user1 = searchParams.get('user1');
  const user2 = searchParams.get('user2');

  const { data: user } = useSelector((state: RootState) => state.user);

  const userId2 = useMemo(
    () => user.id.toString() === user1 ? user2 : user1,
    [user,user1,user2],
  );

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`/users/${userId2}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      return null;
    }
  };
  

  const fetchMessages = async () => {
    setMessageLoading(true)
    try {
      const response = await axios.get(`/messages/user/${userId2}/${user.id}`);
      setMessageLoading(false)
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessageLoading(false)
      return [];
    }
  };

  useEffect(() => {
    // Fetch profile data and messages
    const getProfileData = async () => {
      setLoading(true);
      const data = await fetchProfileData();
      setProfileDataState(data);
      setLoading(false);
    };

    const getMessages = async () => {
      const messagesData = await fetchMessages();
      setMessages(messagesData); // Store fetched messages in state
    };

    getProfileData(); // Fetch profile data on component mount
    getMessages(); // Fetch messages on component mount

    // Initialize socket connection after component mount
    socketService.connect(user.id.toString(), userId2);

    // Listen for incoming messages
    socketService.on("message", (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for user online/offline status
    socketService.on("userOnline", (userId: string) => {
      if (userId === userId2) {
        setIsUserOnline(true);
      }
    });

    socketService.on("userOffline", (userId: string) => {
      if (userId === userId2) {
        setIsUserOnline(false);
      }
    });

    // Cleanup socket connection when the component unmounts
    return () => {
      socketService.cleanup(); // Disconnect and remove listeners
    };
  }, [user, user1, user2]);

  // Handle sending a message
  const sendMessage = () => {
    if (inputMessage.trim()) {
      socketService.sendMessage(user.id.toString(), userId2, inputMessage.trim());
      setInputMessage(''); // Clear the input after sending
      
      const newMessage = {
        senderId: user.id.toString(),
        recipientId: user2,
        content: inputMessage.trim(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const sendImage = (url) => {
    if (url) {
      socketService.sendMessageImage(user.id.toString(), userId2,"", url);
      setInputMessage(''); // Clear the input after sending
      
      const newMessage = {
        senderId: user.id.toString(),
        recipientId: user2,
        mediaUrl: url,
        timestamp: new Date().toISOString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };



  return (
    <Page>
      <ChatLayout>
        <ChatProfileSection userId2={userId2} profileDataState={profileDataState} loading={loading} isUserOnline={isUserOnline}/>
        <main style={{display:"flex",position:"relative", overflow: "auto", flexGrow:1 }}>
          {messageLoading && 
            <motion.div transition={{type:"spring"}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{borderRadius:"12px"}} className="absolute backdrop-blur p-3 backdrop-saturate-150 bg-neutral/30 top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Spinner color="current" size="lg"/>
            </motion.div>
          }
          
          {!messageLoading && messages.length === 0 && 
            <motion.div transition={{type:"spring"}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{borderRadius:"12px"}} className="absolute backdrop-blur p-3 backdrop-saturate-150 bg-neutral/30 top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <NotFountChatList/>
              <p className="text-tiny text-center">{t("noMessages")}</p>
            </motion.div>
          }
          <MessageSection user={user} messages={messages} /> {/* Pass messages to MessageSection */}
        </main>
        <ChatInput 
          inputMessage={inputMessage} 
          setInputMessage={setInputMessage} 
          onSendMessage={sendMessage} 
          onSendImage={sendImage}
        />
     
      </ChatLayout>
    </Page>
  );
}
