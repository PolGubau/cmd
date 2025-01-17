import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { commandsTree } from "../data/commandTree";
import { addConsoleCommand, clearHistory, db } from "../db/db";
import { CommandContext } from "../types";

export const useConsole = () => {
  const [loading, setLoading] = useState(false);

  const consoleData = useLiveQuery(() => db.consoleDB.toArray());

  const messages = consoleData?.[0]?.history || [];
  //
  const handleCommand = async (prompt: string) => {
    setLoading(true);

    try {
      const [command, ...args] = prompt.split(" ");
      let node = commandsTree[command];

      if (!node) {
        await addConsoleCommand(prompt, "Comando no encontrado.");
        return;
      }

      if (node.subCommands && args.length > 0) {
        const subCommand = args.shift() as string;
        node = node.subCommands[subCommand];

        if (!node) {
          await addConsoleCommand(prompt, `Subcomando no encontrado: ${subCommand}`);
          return;
        }
      }
      const ctx: CommandContext = { commandsTree, clearHistory, setColor: () => null };
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

  return { messages, handleCommand, clear, loading };
};
