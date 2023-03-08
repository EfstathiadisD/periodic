function getInput(name: string, message: string) {
  return {
    validate: (value: string) => Boolean(value),
    type: "input",
    message,
    name,
  };
}

function getOptions(name: string, message: string, choices: string[]) {
  return {
    validate: (value: string) => Boolean(value),
    type: "list",
    choices,
    message,
    name,
  };
}

const prompts = [
  getInput("name", "What should we name it?"),
  getOptions("kind", "Where should we placed it?", ["apps", "packages"]),
] as const;

export { prompts };
