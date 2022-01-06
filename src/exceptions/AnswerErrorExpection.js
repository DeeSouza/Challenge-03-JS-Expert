export default class AnswerErrorExpection extends Error {
  constructor(message) {
    super();

    this.message = message;
  }
}
