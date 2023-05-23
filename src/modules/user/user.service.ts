import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { User } from './models/user.entuty';

// 可注入声明
@Injectable()
export class UserService {
  constructor(
    // 注入一个Repository类型的操作实例对象，基于数据库定义User
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  handleError(error: any): boolean {
    console.error(
      '执行异常\n错误提示: %s,\n错误code: %s,\n错误number: %d,\n错误sql: %s',
      error.message,
      error.code,
      error.errno,
      error.sql,
    );
    return false;
  }

  // DeepPartial 将属性变为可选，不需要全部都传递
  // 新增用户
  create(entity: DeepPartial<User>): Promise<boolean> {
    return this.UserRepository.insert(entity)
      .then((res) => {
        // 新增记录，只能是一条记录影响
        return res && res.raw.affectedRows === 1;
      })
      .catch(this.handleError);
  }

  // 删除用户
  remove(id: string): Promise<boolean> {
    return this.UserRepository.delete(id)
      .then((res) => {
        // 这只是删除一条记录，而且使用记录id，所以只可能和一条记录发生关联。
        return res && res.affected === 1;
      })
      .catch(this.handleError);
  }

  // 更新用户
  update(id: string, entity: DeepPartial<User>): Promise<boolean> {
    return this.UserRepository.update(id, entity)
      .then((res) => {
        console.log('update:', res);
        // 更新记录，只能是一条记录影响
        return res && res.affected === 1;
      })
      .catch(this.handleError);
  }

  // 查询用户
  findOne(id: string): Promise<User> {
    return this.UserRepository.findOne({
      where: {
        id,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        this.handleError(err);
        return new User();
      });
  }

  findByPhone(tel: string): Promise<User> {
    return this.UserRepository.findOne({
      where: {
        tel,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        this.handleError(err);
        return new User();
      });
  }
}
