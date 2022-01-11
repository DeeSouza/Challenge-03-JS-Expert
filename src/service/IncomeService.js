import IncomeRepository from "./../repository/IncomeRepository.js";
import Income from "./../entity/Income.js";
import AnswerErrorExpection from "../exceptions/AnswerErrorExpection.js";

import * as currenciesConfig from "../config/currencies.js";
import errorsConfig from "../config/errors.js";

class IncomeService {
  constructor({ incomeRepository } = {}) {
    this.incomeRepository = incomeRepository || new IncomeRepository();
  }

  formatObjectCurrencies(conversions, expectation) {
    const currencies = Object.entries(currenciesConfig.conversions);
    const currenciesFormatted = {};
    const currenciesValues = [];
    const parsedExpectation = this.parseExpectation(expectation);

    for (let [currency, language] of currencies) {
      const value = conversions[currency] * parsedExpectation;
      currenciesValues.push({ currency, language, value });
    }

    for (let cont = 0; cont < 3; cont++) {
      Object.assign(currenciesFormatted, {
        [`conversion0${cont + 1}`]: currenciesValues[cont],
      });
    }

    const {
      expectation: { currency, language },
    } = currenciesConfig;

    Object.assign(currenciesFormatted, {
      expectation: {
        currency,
        language,
        value: parsedExpectation,
      },
    });

    return currenciesFormatted;
  }

  parseExpectation(expectation) {
    return parseInt(expectation);
  }

  async generateIncomeFromString(incomeString, delimiter = ";") {
    const [position, expectation] = incomeString.split(delimiter);

    if (this.checkAnswerEmpty(incomeString)) {
      throw new AnswerErrorExpection(errorsConfig.EMPTY_STRING);
    }

    if (this.checkExpectationIsNumber(expectation)) {
      throw new AnswerErrorExpection(errorsConfig.EXPECTATION_NOT_A_NUMBER);
    }

    const conversions = await this.incomeRepository.getConversions();
    const conversionsFormatted = this.formatObjectCurrencies(
      conversions,
      expectation
    );

    const income = new Income({
      id: Math.random(),
      position,
      expectation,
      ...conversionsFormatted,
    });

    return income;
  }

  formatValuesToPrintTable = (data) => {
    const itemFormatted = data.format();
    const itemLineTableFormatted = this.formatLineToTable(itemFormatted);

    return itemLineTableFormatted;
  };

  formatLineToTable = (data) => {
    const lineFormatted = {
      ...data,
      expectation: data.expectation.value,
      conversion01: data.conversion01.value,
      conversion02: data.conversion02.value,
      conversion03: data.conversion03.value,
    };

    return lineFormatted;
  };

  checkAnswerEmpty(text) {
    return !text || text.length === 0;
  }

  checkAnswerBeenComplete(text, delimiter) {
    const checkPositions = text.split(delimiter);
    if (checkPositions.length < 2) return true;

    const expectationIsEmpty = this.checkAnswerEmpty(checkPositions[1]);
    if (expectationIsEmpty) return true;

    return false;
  }

  checkExpectationIsNumber(expectation) {
    return isNaN(expectation) || !expectation;
  }
}

export default IncomeService;
