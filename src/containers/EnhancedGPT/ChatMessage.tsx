import styles from "./styles.module.css";
import ChatGptAvatar from "./ChatGptAvatar";
import classNames from "classnames";

export type TChatMessage = {
  user: string;
  message: string;
};

function ChatMessage({chatMessage}: {chatMessage: TChatMessage}) {
  return (
    <div
      className={classNames(
        styles.chatLogMessage,
        `${chatMessage.user === "gpt" && styles.chatgpt}`
      )}
    >
      <div className={styles.chatMessageCenter}>
        {chatMessage.user === "gpt" ? (
          <div className={styles.chatgptAvatar}>
            <ChatGptAvatar />
          </div>
        ) : (
          <div className={styles.avatar}></div>
        )}
        <div className={styles.chatLogMessageText}>{chatMessage.message}</div>
      </div>
    </div>
  );
}

export default ChatMessage;
