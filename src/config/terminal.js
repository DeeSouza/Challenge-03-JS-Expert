import chalk from "chalk";

export default {
  table: {
    leftPad: 2,
    columns: [
      { field: "position", name: chalk.yellow("Position") },
      { field: "expectation", name: chalk.cyan("Expectation (BRL)") },
      { field: "conversion01", name: chalk.blue("USD") },
      { field: "conversion02", name: chalk.blue("EUR") },
      { field: "conversion03", name: chalk.blue("JPY") },
    ],
  },
};
