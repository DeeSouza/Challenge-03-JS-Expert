import CustomTerminal from "./terminal.js";
import IncomeService from "./service/IncomeService.js";

const VOCABULARY = {
  STOP: ":q",
  QUESTION:
    "Qual seu cargo e pretensão salarial em BRL? (position; expectation)\n Insira => ",
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  const { QUESTION, STOP } = VOCABULARY;
  console.info("🚀 Running...\n");

  try {
    const answer = await terminal.askQuestionUser(QUESTION);

    if (answer === STOP) {
      terminal.closeTerminal();

      console.log("process finished!");
      return;
    }
  } catch (error) {
    // TODO: Don't forget of handling some errors beautifully ;)
  }

  return mainLoop();
}

await mainLoop();
