import { Catch } from '@midwayjs/decorator';
import { MidwayValidationError } from '@midwayjs/validate';
import { Context } from '@midwayjs/koa';
import { ResponseDto } from '../dto/response.dto';

@Catch(MidwayValidationError)
export class ValidateErrorFilter {
  async catch(err: MidwayValidationError, ctx: Context) {
    const response = new ResponseDto<null>();
    response.code = 422;
    response.result = 'error';
    response.message = '请求参数错误!';
    return response;
  }
}
