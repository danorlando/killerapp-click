import styles from "./styles.module.css";
import "./normal.module.css";
import { useState, useEffect } from "react";
import { PendingElement, Container } from "../../components";
import { InputTextarea } from "primereact/inputtextarea";
import "./styles.module.css";
import classNames from "classnames";
import ChatGptAvatar from "./ChatGptAvatar";
import { useCreateChatMutation } from "../../data-provider";
import { Message } from "primereact/message";
import ChatMessage from "./ChatMessage";

function EnhancedGPT() {
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([
    { user: "gpt", message: "How can I help you today?" },
  ]);

  const createChatMutation = useCreateChatMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createChatMutation.mutate({ prompt: chatInput });
    setChatLog([...chatLog, { user: "me", message: chatInput }]);
    setChatInput("");
  };

  const clearChat = () => {
    setChatLog([]);
  };

  useEffect(() => {
    if (createChatMutation.data) {
      setChatLog([
        ...chatLog,
        { user: "gpt", message: createChatMutation.data.response },
      ]);
    }
  }, [createChatMutation.data]);

  return (
    <div className="flex">
      <aside className={styles.sideMenu}>
        <div className={styles.sideMenuButton} onClick={clearChat}>
          <span>+</span>New Chat
        </div>
      </aside>
      <section className={styles.chatBox}>
        {createChatMutation.isError && (
          <Message severity="error">{`API Error: ${createChatMutation.error?.message}`}</Message>
        )}
        <div className={styles.chatLog}>
          {chatLog.map((message, index) => (
            <ChatMessage chatMessage={message} key={index} />
          ))}
        </div>
        {createChatMutation.isLoading && <PendingElement />}
        <form
          className={styles.chatInputHolder}
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            name="chatInput"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className={styles.chatInputTextArea}
          />
        </form>
      </section>
    </div>
  );
}

export default EnhancedGPT;
