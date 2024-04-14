import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    likes: number;

    //FK
    @ManyToOne(() => UserEntity)
    author_id: UserEntity;
}
