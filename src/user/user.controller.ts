import { Controller, Get, Post, Body, Delete, Put, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { PostEntity, UserEntity } from 'src/entities';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Controller('user')
@UseFilters(HttpExceptionFilter) //컨트롤러별로 적용
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('/user')
    async getUsers(): Promise<UserEntity[]> {
        return this.userService.getUsers();
    }

    @Post('/user')
    async addUser(@Body() info) {
        return this.userService.addUser(info);
    }

    @Delete('/user')
    deleteUser(@Body() info) {
        return this.userService.deleteUser(info.email);
    }

    @Get('/user/find')
    async findByEmail(@Body() info) {
        return this.userService.findByEmail(info.email);
    }

    @Put('/user/password')
    updatePassword(@Body() info) {
        return this.userService.updatePassword(info.email, info.password);
    }
    
    //이 아래가 Post CRUD
    @Get('/post')
    async getPosts(): Promise<PostEntity[]> {
        return this.userService.getPosts();
    }

    @Post('/post')
    async addPost(@Body() info) {
        return this.userService.addPost(info.title, info.content, info.likes, info.author_id);
    }

    @Delete('/post')
    deletePost(@Body() info) {
        return this.userService.deletePost(info.id);
    }

    @Get('/post/find')
    async findById(@Body() info) {
        return this.userService.findById(info.id);
    }

    @Put('/post/content')
    updateContent(@Body() info) {
        return this.userService.updateContent(info.id, info.content);
    }

}