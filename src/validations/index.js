export function checkAnswerEmpty(text) {
  return !text || text.length === 0;
}

export function checkExpectationIsNumber(expectation) {
  return isNaN(expectation) || !expectation;
}
