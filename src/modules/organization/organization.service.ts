import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultBase } from '@/common/types/result.type';
import { OrganizationEntity } from './organization.entity';
import { OrganizationResultsType, OrganizationResultType } from './dto/organization.result.type';

// 可注入声明
@Injectable()
export class OrganizationService {
  // 注入一个Repository类型的操作实例对象，基于数据库定义User
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly repository: Repository<OrganizationEntity>
  ) {}

  /** 创建一个门店 */
  async create(entity: DeepPartial<OrganizationEntity>): Promise<ResultBase> {
    try {
      const res = await this.repository.save(this.repository.create(entity));
      // 新增记录，只能是一条记录影响
      if (res) {
        return {
          code: 200,
          message: '操作成功',
        };
      } else {
        return {
          code: 500,
          message: '数据库操作异常',
        };
      }
    } catch (err) {
      return {
        code: 500,
        message: `服务器内部错误: ${err.message}`,
      };
    }
  }

  /** 删除门店 */
  async delete(id: string): Promise<ResultBase> {
    try {
      const res = await this.repository.softDelete(id);
      // 这只是删除一条记录，而且使用记录id，所以只可能和一条记录发生关联。
      if (res && res.affected === 1) {
        return {
          code: 200,
          message: '删除成功',
        };
      } else if (res && !res.affected) {
        return {
          code: 400,
          message: '没有匹配到任何门店信息',
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

  /** 永久删除门店 */
  async deleteForever(id: string): Promise<ResultBase> {
    try {
      const res = await this.repository.delete(id);
      // 这只是删除一条记录，而且使用记录id，所以只可能和一条记录发生关联。
      if (res && res.affected === 1) {
        return {
          code: 200,
          message: '删除成功',
        };
      } else if (res && !res.affected) {
        return {
          code: 400,
          message: '没有匹配到任何门店信息',
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

  /** 更新门店信息 */
  async update(id: string, entity: DeepPartial<OrganizationEntity>): Promise<ResultBase> {
    try {
      const res = await this.repository.update(id, entity);
      // 更新记录，只能是一条记录影响
      if (res && res.affected === 1) {
        return {
          code: 200,
          message: '更新成功',
        };
      } else if (res && !res.affected) {
        return {
          code: 400,
          message: '没有匹配到任何门店信息',
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
  async findOne(id: string): Promise<OrganizationResultType> {
    try {
      const res = await this.repository.findOne({
        where: { id },
        relations: ['orgFrontImg', 'orgRoomImg', 'orgOtherImg'], // 关联表
      });
      if (res) {
        return {
          code: 200,
          message: '获取数据成功',
          data: res,
        };
      }
      return {
        code: 400,
        message: '查询的门店不存在',
      };
    } catch (err) {
      return {
        code: 500,
        message: `服务器内部错误: ${err.message}`,
      };
    }
  }

  /** 分页查询用户信息 */
  async findPageData(
    start: number,
    length: number,
    where: FindOptionsWhere<OrganizationEntity>
  ): Promise<OrganizationResultsType> {
    try {
      const [results, total] = await this.repository.findAndCount({
        take: length,
        skip: start,
        order: {
          createdAt: 'DESC',
        },
        where,
        relations: ['orgFrontImg', 'orgRoomImg', 'orgOtherImg'],
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
