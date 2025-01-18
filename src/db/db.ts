import Dexie, { EntityTable } from "dexie";
import { ConsoleData, Message, Metadata } from "../types";

// Inicializa la base de datos Dexie
const db = new Dexie("ConsoleDatabase") as Dexie & {
  consoleDB: EntityTable<ConsoleData, "id">;
  metadataDB: EntityTable<Metadata, "id">;
};

db.version(1).stores({
  consoleDB: "++id, name, history",
  metadataDB: "++id, theme, fontSize, darkMode, language",
});
/** Consola inicial predeterminada */
const initialConsole: Omit<ConsoleData, "id"> = {
  name: "Default Console",
  history: [],
};

const initialMetadata: Omit<Metadata, "id"> = {
  theme: "dark",
  fontSize: 16,
  darkMode: false,
  language: "en",
  color: "grey",
};
// Define una tabla tipada para mensajes de consola
const consoleTable = db.consoleDB;

const metadataTable = db.metadataDB;

export const startDatabase = async (): Promise<void> => {
  await db.open();
  // put initial data
  await initializeDatabase();
};

export const getMetadata = async () => {
  const data = await metadataTable.get(1);
  if (!data) {
    await metadataTable.add(initialMetadata);
    return initialMetadata;
  }

  return data || initialMetadata;
};

/** Inicializa la base de datos con una consola si no existe ninguna */
export const initializeDatabase = async (): Promise<void> => {
  const count = await consoleTable.count();
  if (count === 0) {
    await consoleTable.add(initialConsole);
  }
  const countMetadata = await metadataTable.count();
  if (countMetadata === 0) {
    await metadataTable.add(initialMetadata);
  }
};

export const addConsoleCommand = async (prompt: string, response: string | string[]): Promise<void> => {
  // if no console is present, create one, if it is present, get it
  const consoleData = await consoleTable.get(1);
  if (!consoleData) {
    await consoleTable.add(initialConsole);
  }

  if (!consoleData) {
    return;
  }

  const newMessage: Message = {
    id: Date.now(), // Genera un id único (puedes usar otra lógica si es necesario)
    prompt,
    response,
    timestamp: Date.now(),
  };
  const updatedMessages = [...consoleData.history, newMessage];
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

export const setMetadata = async (metadata: keyof Metadata, value: string | number | boolean) => {
  await metadataTable.update(1, { [metadata]: value });
};

export { db };
