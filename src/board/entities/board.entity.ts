import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('boards')
export class Board {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    description?: string;
    

    @ManyToOne(() => User, user => user.boards)
    user: User;

    @OneToMany(() => Task, task => task.board)
    tasks: Task[];

}

