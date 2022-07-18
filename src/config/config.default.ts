import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from "../entity/user.entity";

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1658130392096_7649',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [UserEntity],
    synchronize: true,
    logging: false,
  },
  jwt: {
    secret: 'DEDwer4XCsDOdseekcu', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d', // https://github.com/vercel/ms
  },
} as MidwayConfig;
