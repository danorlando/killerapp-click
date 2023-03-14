import styles from "./styles.module.css";
import "./normal.module.css";
import { useState, useEffect } from "react";
import { PendingElement, Container } from "../../components";
import { InputTextarea } from "primereact/inputtextarea";
import "./styles.module.css";
import {
  useCreateChatMutation,
  useGetOpenAIModelsQuery,
  TOpenAIModel,
} from "../../data-provider";
import { Message } from "primereact/message";
import ChatMessage from "./ChatMessage";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

function EnhancedGPT() {
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([
    { user: "gpt", message: "How can I help you today?" },
  ]);

  const [models, setModels] = useState<TOpenAIModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<TOpenAIModel | undefined>(
    undefined
  );

  const getOpenAIModelsQuery = useGetOpenAIModelsQuery();
  const createChatMutation = useCreateChatMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createChatMutation.mutate({ prompt: chatInput, model: selectedModel?.id });
    setChatLog([...chatLog, { user: "me", message: chatInput }]);
    setChatInput("");
  };

  const clearChat = () => {
    setChatLog([]);
  };

  const handleModelSelected = (model: TOpenAIModel) => {
    setSelectedModel(model);
  };

  useEffect(() => {
    if (createChatMutation.data) {
      setChatLog([
        ...chatLog,
        { user: "gpt", message: createChatMutation.data.response },
      ]);
    }
  }, [createChatMutation.data]);

  useEffect(() => {
    if (getOpenAIModelsQuery.data) {
      setModels(getOpenAIModelsQuery.data.models.data);
    }
  }, [getOpenAIModelsQuery.data]);

  return (
    <div className="flex">
      <aside className={styles.sideMenu}>
        <div className={styles.sideMenuButton} onClick={clearChat}>
          <span>+</span>New Chat
        </div>
        <div className={styles.models}>
          <Dropdown
            value={selectedModel}
            onChange={(e: DropdownChangeEvent) => handleModelSelected(e.value)}
            options={models}
            filter
            optionLabel="id"
            placeholder="Change GPT Model"
            className="w-full md:w-14rem my-4"
            tooltip="Use this control to change the engine used to generate the response from ChatGPT. Davinci tends to produce best results. text-davinci-003 is used by default.            "
          />
        </div>
      </aside>
      <section className={styles.chatSection}>
        <div className={styles.chatBox}>
          {createChatMutation.isError && (
            <Message severity="error">{`API Error: ${createChatMutation.error?.message}`}</Message>
          )}
          <div className={styles.chatLog}>
            {chatLog.map((message, index) => (
              <ChatMessage chatMessage={message} key={index} />
            ))}
          </div>
          {createChatMutation.isLoading && <PendingElement />}
        </div>
        <div className={styles.formContainer}>
          <form
            className={styles.chatInputForm}
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              name="chatInput"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className={styles.chatInputTextArea}
            />
          </form>
        </div>
      </section>
    </div>
  );
}

export default EnhancedGPT;
