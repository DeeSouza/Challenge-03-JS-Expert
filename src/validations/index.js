function checkAnswerEmpty(text) {
  return !text || text.length === 0;
}

function checkExpectationIsNumber(expectation) {
  return isNaN(expectation) || !expectation;
}

module.exports = {
  checkAnswerBeenComplete,
  checkAnswerEmpty,
  checkExpectationIsNumber,
};
