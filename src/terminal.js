import DraftLog from "draftlog";
import chalkTable from "chalk-table";
import chalk from "chalk";
import readline from "readline";
import terminalConfig from "./config/terminal.js";
import stringsConfig from "./config/strings.js";

const TABLE_OPTIONS = terminalConfig.table;

class CustomTerminal {
  constructor() {
    this.print = {};
    this.data = [];
  }

  initialize() {
    const { stdin: input, stdout: output } = process;

    DraftLog(console).addLineListener(input);
    this.terminal = readline.createInterface({ input, output });

    this.generateInterfaceTable();
  }

  generateInterfaceTable() {
    const table = chalkTable(TABLE_OPTIONS, this.data);
    this.print = console.draft(table);
  }

  updateTableWithNewPosition(item) {
    this.data.push(item);
    this.generateInterfaceTable();
  }

  askQuestionUser(question = "") {
    return new Promise((resolve) => this.terminal.question(question, resolve));
  }

  showMessageTerminal(message, type = "info") {
    const typesMessage = {
      info: chalk.blue(message),
      error: chalk.red(message),
    };

    return console.log(typesMessage[type]);
  }

  closeTerminal() {
    this.showMessageTerminal(stringsConfig.THANKS);
    this.terminal.close();
  }
}

export default CustomTerminal;
