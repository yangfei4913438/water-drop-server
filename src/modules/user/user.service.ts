import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { User } from './user.entity';
import { UserInputType } from '@/modules/user/dto/user.input.type';
import {
  UserBooleanResultType,
  UserResultsType,
  UserResultType,
} from '@/modules/user/dto/user.result.type';

// 可注入声明
@Injectable()
export class UserService {
  // 注入一个Repository类型的操作实例对象，基于数据库定义User
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  /** 新增用户 */
  // DeepPartial 将属性变为可选，不需要全部都传递
  async create(entity: DeepPartial<UserInputType>): Promise<UserBooleanResultType> {
    try {
      const res = await this.userRepository.insert(entity);
      // 新增记录，只能是一条记录影响
      if (res && res.raw.affectedRows === 1) {
        return {
          code: 200,
          message: '操作成功',
          data: true,
        };
      } else {
        return {
          code: 500,
          message: `影响行数超出预计范围: 预期1, 实际${res.raw.affectedRows}`,
        };
      }
    } catch (err) {
      return {
        code: 500,
        message: `服务器内部错误: ${err.message}`,
      };
    }
  }

  /** 删除用户 */
  async delete(id: string): Promise<UserBooleanResultType> {
    try {
      const res = await this.userRepository.softDelete(id);
      // 这只是删除一条记录，而且使用记录id，所以只可能和一条记录发生关联。
      if (res && res.affected === 1) {
        return {
          code: 200,
          message: '删除成功',
          data: true,
        };
      } else {
        return {
          code: 500,
          message: `影响行数超出预计范围: 预期1, 实际${res.raw.affectedRows}`,
        };
      }
    } catch (err) {
      return {
        code: 500,
        message: `服务器内部错误: ${err.message}`,
      };
    }
  }

  /** 永久删除用户 */
  async deleteForever(id: string): Promise<UserBooleanResultType> {
    try {
      const res = await this.userRepository.delete(id);
      // 这只是删除一条记录，而且使用记录id，所以只可能和一条记录发生关联。
      if (res && res.affected === 1) {
        return {
          code: 200,
          message: '删除成功',
          data: true,
        };
      } else {
        return {
          code: 500,
          message: `影响行数超出预计范围: 预期1, 实际${res.raw.affectedRows}`,
        };
      }
    } catch (err) {
      return {
        code: 500,
        message: `服务器内部错误: ${err.message}`,
      };
    }
  }

  /** 更新用户信息 */
  async update(id: string, entity: DeepPartial<UserInputType>): Promise<UserBooleanResultType> {
    try {
      const res = await this.userRepository.update(id, entity);
      // 更新记录，只能是一条记录影响
      if (res && res.affected === 1) {
        return {
          code: 200,
          message: '更新成功',
          data: true,
        };
      } else {
        return {
          code: 500,
          message: `影响行数超出预计范围: 预期1, 实际${res.raw.affectedRows}`,
        };
      }
    } catch (err) {
      return {
        code: 500,
        message: `服务器内部错误: ${err.message}`,
      };
    }
  }

  /** 用户id，查询用户信息 */
  async findOne(id: string): Promise<UserResultType> {
    try {
      const res = await this.userRepository.findOne({ where: { id } });
      return {
        code: 200,
        message: '获取数据成功',
        data: res,
      };
    } catch (err) {
      return {
        code: 500,
        message: `服务器内部错误: ${err.message}`,
      };
    }
  }

  /** 手机号，查询用户信息 */
  async findByPhone(tel: string): Promise<UserResultType> {
    try {
      const res = await this.userRepository.findOne({ where: { tel } });
      return {
        code: 200,
        message: '获取数据成功',
        data: res,
      };
    } catch (err) {
      return {
        code: 500,
        message: `服务器内部错误: ${err.message}`,
      };
    }
  }

  /** 分页查询用户信息 */
  async findPageData(start: number, length: number): Promise<UserResultsType> {
    try {
      const [results, total] = await this.userRepository.findAndCount({
        take: length,
        skip: start,
        order: {
          createdAt: 'DESC',
        },
      });
      return {
        code: 200,
        message: '获取数据成功',
        data: results,
        page: {
          pageNum: start,
          pageSize: length,
          total,
        },
      };
    } catch (err) {
      return {
        code: 500,
        message: `服务器内部错误: ${err.message}`,
      };
    }
  }
}
