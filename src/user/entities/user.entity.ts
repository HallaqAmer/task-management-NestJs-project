import { Board } from 'src/board/entities/board.entity';
import { Task } from 'src/task/entities/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

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
  password: string;

  @OneToMany(() => Board, (board) => board.user)
  ownedBoards: Board[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToMany(() => Board, (board) => board.collaborators)
  @JoinTable({
    name: 'boardcollaborators',
    joinColumn: { name: 'assigneeId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'boardId', referencedColumnName: 'id' },
  })
  collaborativeBoards: Board[];
}
