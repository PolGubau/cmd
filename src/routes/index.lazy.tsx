import { createLazyFileRoute } from "@tanstack/react-router";
import { useConsole } from "../hooks/useConsole";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { handleCommand, messages } = useConsole();

  return (
    <code className="flex w-screen items-center justify-center bg-zinc-900 font-normal text-white leading-6 text-opacity-90">
      <main className="flex h-full min-h-screen w-full flex-col justify-end gap-4 p-4 outline outline-red-200">
        <ul className="flex flex-col space-y-2">
          {messages.map((message, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <li key={index} className="flex flex-col gap-2 border-gray-500/30 border-b p-2">
              <small className="text-amber-400">{message.prompt}</small>
              <p>{message.response}</p>
            </li>
          ))}
        </ul>
        <form
          className="flex w-full items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const message = formData.get("prompt") as string;
            handleCommand(message);
            // clear the form
            (e.target as HTMLFormElement).reset();
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
