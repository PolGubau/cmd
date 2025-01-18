import { CommandsTree, Metadata } from "../types";

export const commandsTree: CommandsTree = {
  help: {
    description: "help",
    execute: (context) => {
      context.showCommands(context.commandsTree);
      return null;
    },
  },
  clear: {
    description: "clear",
    execute: (context) => {
      context.clearHistory();
      return "clear";
    },
  },
  cls: {
    description: "clear",
    execute: (context) => {
      context.clearHistory();
      return "clear";
    },
  },
  dark: {
    description: "dark",
    execute: (context) => {
      context.setTheme("dark");
      return "dark";
    },
  },
  light: {
    description: "light",
    execute: (context) => {
      context.setTheme("light");
      return "light";
    },
  },
  exit: {
    description: "exit",
    execute: (context) => {
      window.close();
      context.clearHistory();
      return null;
    },
  },
  reset: {
    description: "reset",
    execute: (context) => {
      context.clearHistory();
      return null;
    },
  },
  color: {
    description: "color",
    execute: (context, args) => {
      if (args.length === 0) {
        return "mustColor";
      }
      // colors need to be from a predefined list
      if (!["red", "green", "blue", "yellow", "grey"].includes(args[0])) {
        return "invalidColor";
      }
      context.setColor(args[0] as Metadata["color"]);
      return "colorChanged";
    },
  },
  lang: {
    description: "lang",
    execute: (context, args) => {
      if (args.length === 0) {
        return "mustLang";
      }
      // colors need to be from a predefined list
      if (!["es", "de", "en"].includes(args[0])) {
        return "invalidLang";
      }
      context.setLang(args[0] as "es" | "en" | "de");
      return "langChanged";
    },
  },

  font: {
    description: "font",
    execute: (context, args) => {
      if (args.length === 0) {
        return "mustFont";
      }
      const size = Number.parseInt(args[0], 10);
      if (Number.isNaN(size) || size < 1 || size > 72) {
        return "invalidSize";
      }
      context.setFont(size);
      return "fontChanged";
    },
  },
};
