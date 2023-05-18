import { Entity, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @Column({ primary: true, generated: 'uuid', comment: '用户id' }) // uuid 不会被猜到，安全性更高
  id: string;

  @Column({ comment: '昵称', default: '' }) // 参数是数据库层面的约束
  @IsNotEmpty() // 类层面不允许为空
  name: string;

  @Column({ comment: '描述', default: '' })
  desc: string;

  @Column({ comment: '手机号', nullable: true })
  tel: string;

  @Column({ comment: '登录密码', nullable: true })
  password: string;

  @Column({ comment: '登录账号', nullable: true })
  account: string;
}
