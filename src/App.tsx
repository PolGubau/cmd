import { useConsole } from "./hooks/useConsole";

export function App() {
  const { addMessage, clearMessages, messages, messagesFromTab } = useConsole();

  return (
    <code className="flex w-screen items-center justify-center bg-zinc-900 font-normal text-white leading-6 text-opacity-90">
      <main className="flex h-full min-h-screen w-full flex-col justify-end gap-4 p-4 outline outline-red-200">
        <ul className="flex flex-col space-y-2">
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        <form
          className="flex w-full items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const message = formData.get("prompt") as string;
            addMessage(message);
          }}
        >
          <span>path &gt;</span>
          {/* biome-ignore lint/a11y/noAutofocus: <explanation> */}
          <input type="text" autoFocus={true} className="flex w-full flex-1" name="prompt" />
        </form>
      </main>
    </code>
  );
}
