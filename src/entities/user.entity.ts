import { Rank } from "src/common/enums/rank.enum";
import { 
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enum: Rank, default: Rank.Bronze})
    rank: Rank;

    @Column({ nullable: true })
    image?: string;

    @CreateDateColumn({ type: 'date' })
    createdAt: Date;

    @Column({ nullable: true })
    token?: string;

    @BeforeInsert()
    private beforeInsert() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
}