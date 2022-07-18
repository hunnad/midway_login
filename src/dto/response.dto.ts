export class ResponseDto<T> {
  code: number;
  result: string;
  message: string;
  data: T;
}
