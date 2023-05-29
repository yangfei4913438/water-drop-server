import { validateOrReject, IsDate, IsOptional } from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  BeforeSoftRemove,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { getDayjs } from '@/utils';

export class BaseEntity {
  // uuid 不会被猜到，安全性更高
  @PrimaryGeneratedColumn('uuid', { comment: 'ID' })
  id: string;

  @CreateDateColumn({ comment: '创建时间', type: 'timestamp', default: getDayjs.toUTCDate() })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @Column({
    comment: '创建者',
    nullable: true,
  })
  @IsOptional()
  createdBy: string;

  @UpdateDateColumn({ comment: '修改时间', type: 'timestamp', nullable: true })
  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @Column({
    comment: '修改者',
    nullable: true,
  })
  @IsOptional()
  updatedBy: string;

  @DeleteDateColumn({ comment: '删除时间', type: 'timestamp', nullable: true })
  @IsDate()
  @IsOptional()
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
    const now = getDayjs.toUTCDate();
    this.createdAt = now;
    this.updatedAt = now;
  }
  @BeforeInsert()
  async validateBeforeInsert() {
    // 插入之前，走上面定义的校验器
    await validateOrReject(this);
  }

  // 更新之前更新更新时间
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = getDayjs.toUTCDate();
  }
  @BeforeUpdate()
  async validateBeforeUpdate() {
    // 更新之前，走上面定义的校验器
    await validateOrReject(this);
  }

  @BeforeSoftRemove()
  async setRemoveAt() {
    this.deletedAt = getDayjs.toUTCDate();
  }
  @BeforeSoftRemove()
  async validateBeforeRemove() {
    await validateOrReject(this);
  }
}
