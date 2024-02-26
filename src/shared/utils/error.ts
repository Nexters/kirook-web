export class HTTPError extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.message = message;
    this.status = status;
  }
}

export function isHTTPError(error: unknown): error is HTTPError {
  return error instanceof HTTPError;
}
