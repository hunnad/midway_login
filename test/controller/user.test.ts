import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Application, Framework } from '@midwayjs/koa';
import { UserService } from '../../src/service/user.service';

describe('test/controller/user.test.ts', () => {

  const username = 'jack';
  const password = 'redballoon13';
  let app: Application;

  beforeAll(async () => {
    try {
      app = await createApp<Framework>();
      // 根据依赖注入 class 获取实例（推荐）
      const userService = await app.getApplicationContext().getAsync<UserService>(UserService);
      await userService.register(username, password);
    } catch(err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });

  it('成功登录', async () => {
    const result = await createHttpRequest(app).post('/api/user/login').send({ username, password}).timeout(1000)

    expect(result.status).toBe(200);
    expect(result.body.code).toBe(200);
    expect(result.body.result).toBe('success');
    expect(result.body.data && result.body.data.token).toBeDefined();
  });

  it('失败登录', async () => {

    const result = await createHttpRequest(app).post('/api/user/login').send({ username, password: "wrongpassword" }).timeout(1000)

    expect(result.status).toBe(200);
    expect(result.body.code).toBe(400);
    expect(result.body.result).toBe('error');
  });

  it('失败登录, 参数不符合规则', async () => {
    const result = await createHttpRequest(app).post('/api/user/login').send({ username }).timeout(1000)
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(422);
    expect(result.body.result).toBe('error');
  });

  afterAll(async () => {
    await close(app);
  });
});
