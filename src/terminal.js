import DraftLog from "draftlog";
import chalkTable from "chalk-table";
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

    this.generateInterfaceTable();
  }

  generateInterfaceTable() {
    const table = chalkTable(TABLE_OPTIONS, this.data);
    this.print = console.draft(table);
  }

  updateTableWithNewPosition({
    position,
    expectation,
    conversion01,
    conversion02,
    conversion03,
  }) {
    this.data.push({
      position,
      expectation: expectation.value,
      conversion01: conversion01.value,
      conversion02: conversion02.value,
      conversion03: conversion03.value,
    });

    this.generateInterfaceTable();
  }

  askQuestionUser(question = "") {
    return new Promise((resolve) => this.terminal.question(question, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }
}

export default CustomTerminal;
