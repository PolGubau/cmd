import translations from "./i18n/en/translation.json";

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
  showCommands: (commands: CommandsTree) => void;
  commandsTree: CommandsTree;
  clearHistory: () => void;
  setColor: (color: Metadata["color"]) => void;
  setTheme: (theme: Metadata["theme"]) => void;
  setFont: (size: number) => void;
  setLang: (lang: Metadata["language"]) => void;
};

export type translationKeys = keyof typeof translations;
export type commandKeys = keyof typeof translations.commands;

export type CommandFunction = (
  context: CommandContext,
  args: string[],
) => commandKeys | Promise<commandKeys> | commandKeys[] | Promise<commandKeys[]> | null;

export type CommandNode = {
  description?: string; // Breve descripción del comando
  execute?: CommandFunction; // Función que se ejecuta para el comando
};

export type CommandsTree = {
  [command: string]: CommandNode;
};
