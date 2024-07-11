import { Board } from 'src/board/entities/board.entity';
import { Task } from 'src/task/entities/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password:string;

    @OneToMany(() => Board, board => board.user)
    boards: Board[];

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

}
