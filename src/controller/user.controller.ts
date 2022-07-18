import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { UserLoginDTO } from '../dto/user.login.dto';
import { Validate } from '@midwayjs/validate';
import { UserService } from '../service/user.service';
import { ResponseDto } from '../dto/response.dto';
import { UserLoginResultDTO } from '../dto/user.login.result.dto';
import { BaseController } from './base.controller';

@Controller('/api/user')
export class UserControllerController extends BaseController {
  @Inject()
  userService: UserService;

  @Post('/login')
  @Validate()
  async login(
    @Body() userLoginDTO: UserLoginDTO
  ): Promise<ResponseDto<UserLoginResultDTO>> {
    try {
      const token = await this.userService.login(
        userLoginDTO.username,
        userLoginDTO.password
      );
      return this.returnOK({ token }, '登录成功');
    } catch (error) {
      return this.returnFail(null, '账号或密码不正确');
    }
  }
}
