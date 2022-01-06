import IncomeRepository from "./../repository/IncomeRepository.js";
import Income from "./../entity/Income.js";
import * as currenciesConfig from "../config/currencies.js";

class IncomeService {
  constructor({ incomeRepository } = {}) {
    this.incomeRepository = incomeRepository || new IncomeRepository();
  }

  formatObjectCurrencies(conversions, expectation) {
    const currencies = Object.entries(currenciesConfig.conversions);
    const currenciesFormatted = {};
    const currenciesValues = [];
    const sanitizedExpectation = this.sanitizeExpectation(expectation);

    for (const [currency, language] of currencies) {
      const value = conversions[currency] * sanitizedExpectation;

      currenciesValues.push({ currency, language, value });
    }

    for (let cont = 0; cont < 3; cont++) {
      Object.assign(currenciesFormatted, {
        [`conversion0${cont + 1}`]: currenciesValues[cont],
      });
    }

    Object.assign(currenciesFormatted, {
      expectation: {
        currency: currenciesConfig.expectation.currency,
        language: currenciesConfig.expectation.language,
        value: sanitizedExpectation,
      },
    });

    return currenciesFormatted;
  }

  sanitizeExpectation(expectation) {
    return parseInt(expectation);
  }

  async generateIncomeFromString(incomeString, delimiter = ";") {
    const [position, expectation] = incomeString.split(delimiter);

    const conversions = await this.incomeRepository.getConversions();
    const conversionsFormatted = this.formatObjectCurrencies(
      conversions,
      expectation
    );

    const income = new Income({
      position,
      expectation,
      ...conversionsFormatted,
    });

    return income;
  }
}

export default IncomeService;
