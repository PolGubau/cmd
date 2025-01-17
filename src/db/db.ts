import Dexie, { EntityTable } from "dexie";
import { ConsoleData, Metadata } from "../types";

// Inicializa la base de datos Dexie
const db = new Dexie("ConsoleDatabase") as Dexie & {
  consoleDB: EntityTable<ConsoleData, "id">;
  metadataDB: EntityTable<Metadata, "id">;
};

db.version(1).stores({
  consoleDB: "++id, name, history",
  metadataDB: "++id, theme, fontSize, darkMode, language",
});

// Define una tabla tipada para mensajes de consola
const consoleTable = db.consoleDB;

/** Consola inicial predeterminada */
const initialConsole: Omit<ConsoleData, "id"> = {
  name: "Default Console",
  history: [],
};

/** Inicializa la base de datos con una consola si no existe ninguna */
export const initializeDatabase = async (): Promise<void> => {
  const count = await consoleTable.count();
  if (count === 0) {
    await consoleTable.add(initialConsole);
  }
};

export const addConsoleCommand = async (prompt: string, response: string): Promise<void> => {
  // if no console is present, create one, if it is present, get it
  const consoleData = await consoleTable.get(1);
  if (!consoleData) {
    await consoleTable.add(initialConsole);
  }

  console.log("consoleData", consoleData);
  if (!consoleData) {
    return;
  }

  const newMessage = {
    id: Date.now(), // Genera un id único (puedes usar otra lógica si es necesario)
    prompt,
    response,
    timestamp: Date.now(),
  };
  const updatedMessages = [...consoleData.history, newMessage];
  console.info("updatedMessages", updatedMessages);
  await consoleTable.update(1, { history: updatedMessages });
};

/** Recuperar todo el historial de mensajes */
export const getHistory = async () => {
  const consoleData = await consoleTable.get(1);
  return consoleData?.history || [];
};

/** Limpiar todo el historial */
export const clearHistory = async (): Promise<void> => {
  await consoleTable.update(1, { history: [] });
};

export { db };
