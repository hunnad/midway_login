import { Inject, Provide } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';
import { UserModel } from '../model/user.model';
import { UserEntity } from '../entity/user.entity';

@Provide()
export class UserService {
  @Inject()
  jwtService: JwtService;

  @Inject()
  userModel: UserModel;

  /**
   * 注册新用户
   * @param username
   * @param password
   */
  async register(username: string, password: string): Promise<UserEntity> {
    return this.userModel.registerUser(username, password);
  }

  /**
   * 用户登录
   * @param username
   * @param password
   */
  async login(username: string, password: string): Promise<string> {
    const user: UserEntity = await this.userModel.getUserByUsernameAndPassword(
      username,
      password
    );
    if (!user) {
      throw "can't find user, login failed";
    }
    return this.getToken(user);
  }

  /**
   * 检测用户名是否已经注册
   * @param username
   */
  async isUserRegister(username: string): Promise<boolean> {
    return this.userModel.isUserNameRegister(username);
  }

  /**
   * 生成用户token用于登录验证
   * @param user
   */
  getToken(user: UserEntity): string {
    return this.jwtService.signSync({ username: user.username });
  }
}
