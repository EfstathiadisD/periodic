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

export { getInput, getOptions };
