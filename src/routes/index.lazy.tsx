import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Response } from "../components/Response";
import { useConsole } from "../hooks/useConsole";
import { Message } from "../types";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useTranslation();

  const { handleCommand, messages, metadata, populate } = useConsole();
  useEffect(() => {
    if (!metadata) {
      populate();
    }
  }, [metadata, populate]);

  // scroll to top each time the messages change
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [messages]);
  const placeHolderMessages: Message[] = [
    {
      prompt: t("commands.placeholder.prompt"),
      response: t("commands.placeholder.subtitle"),
      timestamp: Date.now(),
      id: Date.now(),
    },
  ];
  const darkMode = metadata?.[0]?.theme === "dark";
  return (
    <div className={` ${darkMode ? "dark" : ""}`}>
      <code
        className={
          " flex w-screen items-center justify-center bg-zinc-200 font-normal text-black leading-6 text-opacity-90 dark:bg-zinc-900 dark:text-white"
        }
        style={{ fontSize: `${metadata?.[0]?.fontSize}px` }}
      >
        <main className="flex h-full min-h-screen w-full flex-col justify-end gap-4 p-4 outline outline-red-200">
          <ul className="flex flex-col space-y-2">
            {(messages.length === 0 ? placeHolderMessages : messages).map((message, index) => {
              const dateTime = new Date(message.timestamp).toLocaleTimeString();
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <li key={index} className="flex flex-col gap-2 border-gray-500/30 border-b p-2">
                  <div className="flex justify-between text-amber-800 dark:text-amber-400">
                    <small>{message.prompt}</small>
                    <small>{dateTime}</small>
                  </div>
                  <ul>
                    {typeof message.response === "string" ? (
                      <li>
                        <Response answer={message.response} />
                      </li>
                    ) : (
                      message.response.map((line, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        <li key={i}>
                          <Response answer={line} />
                        </li>
                      ))
                    )}
                  </ul>
                </li>
              );
            })}
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
            <span className="flex items-center gap-2">
              <b className="text-lime-700 dark:text-lime-300">{t("path")}</b>
              &gt;
            </span>
            <input
              type="text"
              // biome-ignore lint/a11y/noAutofocus: <explanation>
              autoFocus={true}
              placeholder={t("placeholder")}
              className="flex w-full flex-1 bg-transparent text-black dark:text-white"
              name="prompt"
            />
          </form>
        </main>
      </code>
    </div>
  );
}
