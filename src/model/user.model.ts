import { InjectEntityModel } from '@midwayjs/orm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Inject, Provide } from '@midwayjs/decorator';
import { MidwayValidationError, ValidateService } from '@midwayjs/validate';

@Provide()
export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  @Inject()
  validateService: ValidateService;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<UserEntity> {
    return this.userRepo.findOne({
      where: {
        username,
        password,
      },
    });
  }

  /**
   * 注册新用户
   * @param username
   * @param password
   */
  async registerUser(username: string, password: string): Promise<UserEntity> {
    const isUserRegister = await this.isUserNameRegister(username);
    if (isUserRegister) {
      throw 'user registered';
    }
    const result = this.validateService.validate(UserEntity, {
      username,
      password,
    });
    if (result.error instanceof MidwayValidationError) {
      throw 'username or password invalid';
    }
    return this.userRepo.save({
      username,
      password,
    });
  }

  /**
   * 检查用户名是否已经注册
   * @param username
   */
  async isUserNameRegister(username: string): Promise<boolean> {
    const user = await this.userRepo.findOne({
      where: {
        username,
      },
    });
    return user != null;
  }
}
