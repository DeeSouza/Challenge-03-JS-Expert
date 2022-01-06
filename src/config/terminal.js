import chalk from "chalk";

export default {
  table: {
    leftPad: 2,
    columns: [
      { field: "position", name: chalk.yellow("Position") },
      { field: "expectation", name: chalk.cyan("Expectation (BRL)") },
      { field: "usd", name: chalk.blue("USD") },
      { field: "eur", name: chalk.blue("EUR") },
      { field: "jpy", name: chalk.blue("JPY") },
    ],
  },
};
