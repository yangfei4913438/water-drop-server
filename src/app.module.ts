import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OSSModule } from '@/modules/oss/oss.module';
import { RedisModule } from '@/common/redis/redis.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from '@/modules/organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_POST),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PWD,
      database: process.env.MYSQL_DATABASE,
      logging: true, // 是否启用日志记录
      dropSchema: false, // 每次初始化数据源时删除架构。谨慎使用此选项，不要在生产中使用它 - 否则您将丢失所有生产数据
      synchronize: true, // 是否应在每次应用程序启动时自动创建数据库模式。请小心使用此选项，不要在生产中使用它-否则您可能会丢失生产数据。
      entities: [`${__dirname}/../modules/**/*.entity{.ts,.js}`], // 指定数据表映射文件的位置
      autoLoadEntities: true, // 如果true，实体将自动加载
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // 内存存储
    }),
    AuthModule,
    RedisModule,
    OSSModule,
    UserModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
