import CustomTerminal from "./terminal.js";
import IncomeService from "./service/IncomeService.js";

const VOCABULARY = {
  STOP: ["quit", "exit", ":q", "sair"],
  QUESTION:
    "\nQual seu cargo e pretensão salarial em BRL? (position; expectation)\n Insira => ",
};

const terminal = new CustomTerminal();

terminal.showMessageTerminal(
  "Calculadora de pretensão salarial em moedas estrangeiras.\n"
);

terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  const { QUESTION } = VOCABULARY;

  try {
    const outPutAnswer = await terminal.askQuestionUser(QUESTION);
    const checkCloseTerminal = closeTerminal(outPutAnswer);

    if (checkCloseTerminal) return;

    const incomeGenerated = await service.generateIncomeFromString(
      outPutAnswer
    );
    const valuesToPrintTable =
      service.formattedValuesToPrintTable(incomeGenerated);

    terminal.updateTableWithNewPosition(valuesToPrintTable);
  } catch (error) {
    terminal.showMessageTerminal(error.message);

    return mainLoop();
  }

  return mainLoop();
}

function closeTerminal(outPutAnswer) {
  const { STOP } = VOCABULARY;

  if (STOP.includes(outPutAnswer)) {
    terminal.closeTerminal();

    return true;
  }

  return false;
}

await mainLoop();
