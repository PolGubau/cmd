export interface Message {
  id: number;
  prompt: string;
  response: string | string[];
  timestamp: number;
}

export interface ConsoleData {
  id: number;
  name: string;
  history: Message[];
}

export interface Metadata {
  id: number;
  theme: "light" | "dark";
  fontSize: number;
  color: "red" | "blue" | "green" | "yellow" | "grey";
  darkMode: boolean;
  language: "en" | "es" | "de";
}

export type CommandContext = {
  commandsTree: CommandsTree;
  clearHistory: () => void;
  setColor: (color: Metadata["color"]) => void;
  setTheme: (theme: Metadata["theme"]) => void;
  setFont: (size: number) => void;
  setLang: (lang: Metadata["language"]) => void;
};

export type CommandFunction = (
  context: CommandContext,
  args: string[],
) => string | Promise<string> | string[] | Promise<string[]> | null;

export type CommandNode = {
  description?: string; // Breve descripción del comando
  execute?: CommandFunction; // Función que se ejecuta para el comando
  subCommands?: CommandsTree; // Subcomandos anidados
};

export type CommandsTree = {
  [command: string]: CommandNode;
};
