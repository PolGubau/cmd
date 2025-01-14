import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db/db";
import { Data } from "../types";

export const useConsole = () => {
  const consoleData = useLiveQuery(() => db.console.toArray()) ?? [];

  const addMessage = async (message: string) => {
    // if empty, add a new console entry
    if (consoleData.length > 0) {
      // if not empty, update the existing console entry
      const { id, messages } = consoleData[0];
      await db.console.update(id, { messages: [...messages, message] });
    } else {
      await db.console.add({ messages: [message] });
    }
  };

  const messagesFromTab = async (tabId: Data["id"]) => {
    const consoleData = await db.console.get(tabId);
    return consoleData?.messages;
  };

  const clearMessages = async () => {
    if (consoleData.length > 0) {
      const { id } = consoleData[0];
      await db.console.update(id, { messages: [] });
    }
  };

  const messages = consoleData.length > 0 ? consoleData[0].messages : [];

  return {
    addMessage,
    clearMessages,
    messages,
    messagesFromTab,
  };
};
