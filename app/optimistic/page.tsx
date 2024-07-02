"use client";
import { useState } from "react";
import { deliverMessage } from "./actions";
import { Thread } from "./Thread";

type Message = {
  text: string;
  sending?: boolean;
  key?: number;
};

const initialMessage: Message = {
  text: "Hello there!",
  sending: false,
  key: 1,
};

export default function App() {
  const [messages, setMessages] = useState([initialMessage]);

  async function sendMessage(formData: FormData) {
    const sentMessage = await deliverMessage(formData.get("message") as string);
    setMessages((messages) => [...messages, { text: sentMessage }]);
  }
  return <Thread messages={messages} sendMessage={sendMessage} />;
}
