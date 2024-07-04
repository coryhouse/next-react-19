import { useOptimistic, useRef } from "react";
type Message = {
  text: string;
  sending?: boolean;
};

type ThreadProps = {
  messages: Message[];
  sendMessage: (formData: FormData) => Promise<void>;
};

export function Thread({ messages, sendMessage }: ThreadProps) {
  const formRef = useRef<HTMLFormElement | null>(null);

  async function formAction(formData: FormData) {
    addOptimisticMessage(formData.get("message") as string);
    formRef.current?.reset();
    await sendMessage(formData);
  }

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ]
  );

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {message.sending && <small> (Sending...)</small>}
        </div>
      ))}

      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="Hello!" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
