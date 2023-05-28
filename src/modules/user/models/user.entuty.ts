import { Entity, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from '@/modules/common/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ comment: '用户昵称', default: '' }) // 参数是数据库层面的约束
  @IsNotEmpty() // 类层面不允许为空
  name: string;

  @Column({ comment: '用户描述', default: '' })
  desc: string;

  @Column({ comment: '用户头像', nullable: true })
  avatar: string;

  @Column({ comment: '用户登录手机号', unique: true })
  tel: string;

  @Column({ comment: '用户登录密码', nullable: true })
  password: string;

  @Column({ comment: '用户登录账号', nullable: true })
  account: string;
}
