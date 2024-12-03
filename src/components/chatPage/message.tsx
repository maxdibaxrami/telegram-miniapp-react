import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import "./style.css";

const messages = [
  {
    type: "me",
    text: "Hey! How are you?",
    time: "11:00",
  },
  {
    type: "you",
    text: "I'm doing great, thanks! How about you?",
    time: "11:01",
  },
  {
    type: "me",
    text: "I'm good, just working on a project.",
    time: "11:05",
  },
  {
    type: "time",
    time: "11:05 yesterday",
  },
  {
    type: "you",
    text: "Sounds interesting! What's it about?",
    time: "11:07",
  },
  {
    type: "me",
    text: "I'm building a chat app in React!",
    time: "11:10",
  },
  {
    type: "you",
    text: "Nice! React is great for that.",
    time: "11:12",
    img: "https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp", // Image message

  },
  {
    type: "me",
    text: "Totally! I love how reusable components are.",
    time: "11:15",
  },
  {
    type: "you",
    text: "Yeah, once you get the hang of it, it's very flexible.",
    time: "11:17",
  },
  {
    type: "me",
    text: "",
    time: "11:20",
    img: "https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp", // Image message
  },
  {
    type: "you",
    text: "That looks really nice!",
    time: "11:23",
  },
  {
    type: "me",
    text: "Thanks! What are you working on?",
    time: "11:25",
  },
  {
    type: "time",
    time: "11:05 yesterday",
  },
  {
    type: "you",
    text: "I'm working on a portfolio website for a client.",
    time: "11:27",
  },
  {
    type: "me",
    text: "",
    time: "11:30",
    img: "https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp", // Another image message
  },
  {
    type: "time",
    time: "11:05 today",
  },
  {
    type: "you",
    text: "That's a great layout! Simple and clean.",
    time: "11:32",
  },
  {
    type: "me",
    text: "Thanks! Let me know if you need help with anything.",
    time: "11:35",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Adjust the delay between messages here
    },
  },
};

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const MessageSection = () => {
  const Theme = useTheme();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${Theme.theme === "light" ? "message-container-light" : "message-container-dark"} w-full flex flex-col border-small px-1 gradient--telegram rounded-small border-default-200 dark:border-default-100`}
      style={{ overflow: "scroll", flexDirection: "column-reverse", transition:"transform 0.3s ease-in-out" }}
    >
      {messages.map((msg, index) => {
        if (msg.type === "time") {
          return (
            <motion.div key={index} variants={messageVariants} className="mb-2">
              <p className="time">{msg.time}</p>
            </motion.div>
          );
        }

        return (
          <motion.div key={index} variants={messageVariants} className={`chat-${msg.type} chat-m ${msg.type=="me"?"bg-background text-foreground":""} flex flex-col`}>
            <div className={`chat-bubble chat-${msg.type}`}>
              {!msg.img && (<p>{msg.text}</p>) }

              {msg.img && (
                <img alt="conversation" className="chat-image" src={msg.img} />
              )}
              <small className={`chat${msg.type}--time`}>{msg.time}</small>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default MessageSection;
