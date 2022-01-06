import CustomTerminal from "./terminal.js";
import IncomeService from "./service/IncomeService.js";

const VOCABULARY = {
  STOP: "quit",
  QUESTION:
    "Qual seu cargo e pretensão salarial em BRL? (position; expectation)\n Insira => ",
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  const { QUESTION } = VOCABULARY;
  console.info("🚀 Running...\n");

  try {
    const outPutAnswer = await terminal.askQuestionUser(QUESTION);
    const checkCloseTerminal = closeTerminal(outPutAnswer);

    if (checkCloseTerminal) return;

    const valuesFormatted = service.generateIncomeFromString(outPutAnswer);
  } catch (error) {
    // TODO: Don't forget of handling some errors beautifully ;)
  }

  return mainLoop();
}

function closeTerminal(outPutAnswer) {
  const { STOP } = VOCABULARY;
  if (outPutAnswer !== STOP) return false;

  terminal.closeTerminal();

  return true;
}

await mainLoop();
