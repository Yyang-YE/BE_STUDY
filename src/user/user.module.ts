import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities';
import { PostEntity } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity])], 
  controllers: [UserController],
  providers: [UserService, UserRepository]
})
export class UserModule {}
