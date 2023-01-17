import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'chat_message' })
export class ChatMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  author: string;

  @Column()
  roomId: string;

  @CreateDateColumn()
  createdAt: Date;
}
