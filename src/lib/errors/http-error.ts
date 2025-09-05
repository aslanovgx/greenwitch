// lib/errors/http-error.ts
export class HttpError extends Error {
  constructor(public status: number, message: string, public body?: string) {
    super(message);
    this.name = "HttpError";
  }
}
