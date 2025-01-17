export interface Message {
  id: number;
  prompt: string;
  response: string;
  timestamp: number;
}

export interface ConsoleData {
  id: number;
  name: string;
  history: Message[];
}

export interface Metadata {
  id: number;
  theme: string;
  fontSize: number;
  darkMode: boolean;
  language: string;
}

export type CommandContext = {
  commandsTree: CommandsTree;
  clearHistory: () => void;
  setColor: (color: string) => void;
};

export type CommandFunction = (context: CommandContext, args: string[]) => string | Promise<string>;

export type CommandNode = {
  description?: string; // Breve descripción del comando
  execute?: CommandFunction; // Función que se ejecuta para el comando
  subCommands?: CommandsTree; // Subcomandos anidados
};

export type CommandsTree = {
  [command: string]: CommandNode;
};
