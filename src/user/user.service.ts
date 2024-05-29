import { Injectable } from '@nestjs/common';
import { PostEntity, UserEntity } from 'src/entities';
import { UserRepository } from 'src/repositories/user.repository';
import { UserResponseDto } from './dtos/user.response.dto';
import { EmailRequestDto, PasswordRequestDto, UserRequestDto } from './dtos/user.request.dto';
//이따 여따 PostRepository 임포트하기

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getUsers(): Promise<UserResponseDto[]> {
        const userEntity = await this.userRepository.findAll();
        const users = userEntity.map((user) => new UserResponseDto(user));
        return users;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const userEntity = await this.userRepository.findByEmail(email);
        return userEntity;
    }

    async findByVal(key: keyof UserEntity, val: any): Promise<UserEntity> {
        const userEntity = await this.userRepository.findByVal(key, val);
        return userEntity;
    }

    async addUser(body: UserRequestDto): Promise<UserResponseDto> {
        const newUserEntity = await this.userRepository.create(body);
        const newUser = new UserResponseDto(newUserEntity);
        return newUser;
    }

    async deleteUser(body: EmailRequestDto): Promise<void> {
        await this.userRepository.deleteByEmail(body.email);
    }

    async updatePassword(body: PasswordRequestDto): Promise<void> {
        await this.userRepository.updatePassword(body.email, body.password);
    }

    async updateToken(email: string, token: string): Promise<void> {
        await this.userRepository.updateToken(email, token);
    }

    //postEntity (깃헙 보고 다시 적어넣기)

    // async getPosts(): Promise<PostEntity[]> {
    //     const posts = await this.postRepository.find();
    //     return posts;
    // }

    // async findById(id: number): Promise<PostEntity> {
    //     const post = await this.postRepository.findOne({ where: { id } });
    //     return post;
    // }

    // async addPost(title: string, content: string, likes: number, author_id: number): Promise<PostEntity | void> {
    //     const author = await this.userRepository.findOne({ where: { id: author_id } });

    //     if(!author) {
    //         throw new HttpException('user dose not exists', 409);
    //     } else {
    //         const post = new PostEntity();
    //         post.title = title;
    //         post.content = content;
    //         post.likes = likes;
    //         post.author_id = author;

    //         return await this.postRepository.save(post);
    //     }
    // }

    // async deletePost(id: number): Promise<void> {
    //     if (await this.findById(id)) {
    //         await this.postRepository.delete({ id });
    //     } else {
    //         throw new HttpException('post not found', 404);
    //     }
    // }

    // async updateContent(id: number, content: string): Promise<void> {
    //     if (await this.findById(id)) {
    //         await this.postRepository.update({ id }, { content });
    //     } else {
    //         throw new HttpException('post not found', 404);
    //     }
    // }
}