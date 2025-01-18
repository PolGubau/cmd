import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { commandsTree } from "../data/commandTree";
import { addConsoleCommand, clearHistory, db, setMetadata, startDatabase } from "../db/db";
import { CommandContext } from "../types";

export const useConsole = () => {
  const [loading, setLoading] = useState(false);
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const consoleData = useLiveQuery(() => db.consoleDB.toArray());
  const metadata = useLiveQuery(() => db.metadataDB.toArray());

  const messages = consoleData?.[0]?.history || [];

  const handleChangeLanguage = (newLang: "es" | "en" | "de") => {
    setMetadata("language", newLang);
    changeLanguage(newLang);
  };

  //
  const handleCommand = async (prompt: string) => {
    setLoading(true);

    try {
      const [command, ...args] = prompt.split(" ");
      // case should not matter, so the comparison is done in lowercase (command and the keys in the tree)
      const node = commandsTree[command.toLowerCase()];

      if (!node) {
        await addConsoleCommand(prompt, "Comando no encontrado.");
        return;
      }

      const ctx: CommandContext = {
        commandsTree,
        clearHistory,
        setColor: () => {
          setMetadata("color", args[0]);
        },
        setTheme(theme) {
          setMetadata("theme", theme);
        },
        setFont: () => {
          setMetadata("fontSize", Number.parseInt(args[0], 10));
        },
        setLang: (lng) => {
          handleChangeLanguage(lng);
        },
      };
      const response = node.execute ? await node.execute(ctx, args) : "Comando ejecutado.";
      if (!response) {
        return;
      }

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
