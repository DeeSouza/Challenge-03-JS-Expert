import DraftLog from "draftlog";
import chalkTable from "chalk-table";
import chalk from "chalk";
import readline from "readline";
import terminalConfig from "./config/terminal.js";

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

    this.initializeInterfaceTable();
  }

  initializeInterfaceTable() {
    const table = chalkTable(TABLE_OPTIONS, this.data);
    this.print = console.draft(table);
  }

  closeTerminal() {
    this.terminal.close();
  }

  askQuestionUser(question = "") {
    return new Promise((resolve) => this.terminal.question(question, resolve));
  }
}

export default CustomTerminal;
