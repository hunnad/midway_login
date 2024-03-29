import { Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import { httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;
      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          await this.jwtService.verify(token, {
            complete: true,
          });
        } catch (error) {
          /**
          //token过期 生成新的token
          const {username, password} = this.jwtService.decodeSync(token);
          const newToken = this.userService.getToken(user);
          //将新token放入Authorization中返回给前端
          ctx.set('Authorization', newToken);
           **/
        }
      }
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const ignore = ctx.path.indexOf('/user/login') !== -1;
    return !ignore;
  }
}
