import { Board } from 'src/board/entities/board.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('tasks')
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description?: string;

    @Column()
    priority?: string;

    @Column()
    dueDate?: Date;

    @Column()
    status?: string;
    

    @ManyToOne(() => User, user => user.tasks)
    user: User;

    @ManyToOne(() => Board, board => board.tasks)
    board: Board;

}