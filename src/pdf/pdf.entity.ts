import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Pdf {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column({ default: 0 })
  userCount: number;

  @CreateDateColumn()
  createdAt: Date;
}
