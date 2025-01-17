import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { commandsTree } from "../data/commandTree";
import { addConsoleCommand, clearHistory, db, setMetadata, startDatabase } from "../db/db";
import { CommandContext } from "../types";

export const useConsole = () => {
  const [loading, setLoading] = useState(false);

  const consoleData = useLiveQuery(() => db.consoleDB.toArray());
  const metadata = useLiveQuery(() => db.metadataDB.toArray());

  const messages = consoleData?.[0]?.history || [];
  //
  const handleCommand = async (prompt: string) => {
    setLoading(true);

    try {
      const [command, ...args] = prompt.split(" ");
      const node = commandsTree[command];

      if (!node) {
        await addConsoleCommand(prompt, "Comando no encontrado.");
        return;
      }

      const ctx: CommandContext = {
        commandsTree,
        clearHistory,
        setColor: () => {
          setMetadata("theme", args[0]);
        },
        setTheme(theme) {
          setMetadata("theme", theme);
        },
        setFont: () => {
          setMetadata("fontSize", Number.parseInt(args[0], 10));
        },
      };
      const response = node.execute ? await node.execute(ctx, args) : "Comando ejecutado.";
      await addConsoleCommand(prompt, response);
    } catch (error) {
      const errorHistory = "Error al procesar el comando.";
      await addConsoleCommand(prompt, errorHistory);
    } finally {
      setLoading(false);
    }
  };

  const clear = clearHistory;

  const populate = async () => {
    await startDatabase();
  };

  return { messages, handleCommand, clear, loading, metadata, populate };
};
