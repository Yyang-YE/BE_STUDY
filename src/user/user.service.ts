import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity, UserEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ) {}

    async getUsers(): Promise<UserEntity[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { email }});
        return user;
    }

    async addUser(info: UserEntity): Promise<UserEntity | void> {
        if(!(await this.findByEmail(info.email))) {
            const user = this.userRepository.create(info);
            //DB 직접 접근은 Promise! 그래서 await 필요라고 생각하기
            return await this.userRepository.save(info);
        } else {
            throw new HttpException('user already exists', 409);
        }
    }

    async deleteUser(email: string): Promise<void> {
        if (await this.findByEmail(email)) {
            await this.userRepository.delete({ email });
        } else {
            throw new HttpException('user not found', 404);
        }
    }

    async updatePassword(email: string, password: string): Promise<void> {
        if (await this.findByEmail(email)) {
            await this.userRepository.update({ email }, { password });
        } else {
            throw new HttpException('user not found', 404);
        }
    }

    //postEntity
    async getPosts(): Promise<PostEntity[]> {
        const posts = await this.postRepository.find();
        return posts;
    }

    async findById(id: number): Promise<PostEntity> {
        const post = await this.postRepository.findOne({ where: { id } });
        return post;
    }

    async addPost(title: string, content: string, likes: number, author_id: number): Promise<PostEntity | void> {
        const author = await this.userRepository.findOne({ where: { id: author_id } });

        if(!author) {
            throw new HttpException('user dose not exists', 409);
        } else {
            const post = new PostEntity();
            post.title = title;
            post.content = content;
            post.likes = likes;
            post.author_id = author;

            return await this.postRepository.save(post);
        }
    }

    async deletePost(id: number): Promise<void> {
        if (await this.findById(id)) {
            await this.postRepository.delete({ id });
        } else {
            throw new HttpException('post not found', 404);
        }
    }

    async updateContent(id: number, content: string): Promise<void> {
        if (await this.findById(id)) {
            await this.postRepository.update({ id }, { content });
        } else {
            throw new HttpException('post not found', 404);
        }
    }
}