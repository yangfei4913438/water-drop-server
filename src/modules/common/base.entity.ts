import { validateOrReject, IsDate, IsOptional } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';

export class BaseEntity {
  // uuid 不会被猜到，安全性更高
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  id: string;

  @Column({
    comment: '创建时间',
    type: 'timestamp',
  })
  createdAt: Date;

  @Column({
    comment: '创建者',
    nullable: true,
  })
  @IsOptional()
  createdBy: string;

  @Column({
    comment: '修改时间',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    comment: '修改者',
    nullable: true,
  })
  @IsOptional()
  updatedBy: string;

  @DeleteDateColumn()
  @IsDate()
  @IsOptional()
  @Column({
    comment: '删除时间',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    comment: '删除者',
    nullable: true,
  })
  @IsOptional()
  deletedBy: string;

  // 创建之前加上创建和更新时间
  @BeforeInsert()
  setCreatedAt() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  // 更新之前更新更新时间
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  async validateBeforeInsert() {
    // 插入之前，走上面定义的校验器
    await validateOrReject(this);
  }

  @BeforeUpdate()
  async validateBeforeUpdate() {
    // 更新之前，走上面定义的校验器
    await validateOrReject(this, { skipMissingProperties: true });
  }
}
