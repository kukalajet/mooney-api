export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
