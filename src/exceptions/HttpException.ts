export default class HttpException extends Error {
  public statusCode: number;
  public status: string;
  public message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
  }
}
