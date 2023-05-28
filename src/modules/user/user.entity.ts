import { Entity, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from '@/common/types/base.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column({ comment: '用户昵称', nullable: false }) // 参数是数据库层面的约束
  @IsNotEmpty() // 类层面不允许为空
  name: string;

  @Column({
    comment: '账号是否被禁用：用户无法登陆，但可以查询出用户信息',
    default: false,
  })
  @IsNotEmpty()
  disabled: boolean;

  @Column({
    comment: '用户类型: student,teacher,admin',
    default: 'student',
  })
  @IsNotEmpty()
  userType: string;

  @Column({ comment: '用户描述', nullable: true })
  desc: string;

  @Column({ comment: '用户头像', nullable: true })
  avatar: string;

  @Column({ comment: '用户登录手机号', unique: true, nullable: false })
  @IsNotEmpty()
  tel: string;

  @Column({ comment: '用户登录密码', nullable: false })
  @IsNotEmpty()
  password: string;

  @Column({ comment: '用户登录账号, 双模式登陆使用，暂时未启用', nullable: true })
  account: string;
}
