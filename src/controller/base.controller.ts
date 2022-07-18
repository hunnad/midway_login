import { ResponseDto } from '../dto/response.dto';

export class BaseController {
  returnOK<T>(data: T, message = ''): ResponseDto<T> {
    const response = new ResponseDto<T>();
    response.code = 200;
    response.result = 'success';
    response.message = message;
    response.data = data;
    return response;
  }

  returnFail<T>(data: T, message = '', code = 400, result = 'error') {
    return this.returnResult(data, message, code, result);
  }

  returnResult<T>(data: T, message: string, code: number, result: string) {
    const response = new ResponseDto<T>();
    response.code = code;
    response.message = message;
    response.result = result;
    response.data = data;
    return response;
  }
}
