import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { EntityModel } from '@midwayjs/orm';
import { Rule, RuleType } from '@midwayjs/validate';

@EntityModel()
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '用户的自增ID',
  })
  id: number;

  @Column('varchar', {
    name: 'username',
    comment: '用户名',
    length: 64,
  })
  @Rule(RuleType.string().pattern(/^[a-zA-Z0-9_-]{4,16}$/))
  username: string;

  @Column('varchar', {
    name: 'password',
    nullable: true,
    comment: '用户密码',
    length: 64,
  })
  @Rule(
    RuleType.string().pattern(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)
  )
  password: string | null;
}
