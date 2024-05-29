import { Controller, Get, Post, Body, Delete, Put, UseFilters, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { UserResponseDto } from './dtos/user.response.dto';
import { EmailRequestDto, PasswordRequestDto, UserRequestDto } from './dtos/user.request.dto';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/interfaces/jwt.payload';

@Controller('user')
@UseFilters(HttpExceptionFilter) //컨트롤러별로 적용
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    @UseGuards(AccessGuard)
    async getUsers(@Req() req: Request): Promise<UserResponseDto> {
        const { id } = req.user as JwtPayload;
        return this.userService.findByVal('id', id);
    }

    @Post()
    async addUser(@Body() body: UserRequestDto): Promise<UserResponseDto> {
        return this.userService.addUser(body);
    }

    @Delete()
    async deleteUser(@Body() body: EmailRequestDto): Promise<void> {
        return this.userService.deleteUser(body);
    }

    @Get('/find')
    async findByEmail(@Body() body: EmailRequestDto): Promise<UserResponseDto> {
        return this.userService.findByEmail(body.email);
    }

    @Put('/password')
    updatePassword(@Body() body: PasswordRequestDto): Promise<void> {
        return this.userService.updatePassword(body);
    }
    
    //이 아래가 Post CRUD
    // @Get('/post')
    // async getPosts(): Promise<PostEntity[]> {
    //     return this.userService.getPosts();
    // }

    // @Post('/post')
    // async addPost(@Body() info) {
    //     return this.userService.addPost(info.title, info.content, info.likes, info.author_id);
    // }

    // @Delete('/post')
    // deletePost(@Body() info) {
    //     return this.userService.deletePost(info.id);
    // }

    // @Get('/post/find')
    // async findById(@Body() info) {
    //     return this.userService.findById(info.id);
    // }

    // @Put('/post/content')
    // updateContent(@Body() info) {
    //     return this.userService.updateContent(info.id, info.content);
    // }

}