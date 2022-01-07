export default class ServiceNotReachedException extends Error {
  constructor(message) {
    super();

    this.message = message;
  }
}
