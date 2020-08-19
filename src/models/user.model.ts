import { Column, Entity, Index, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Index('email_UNIQUE', ['email'], { unique: true })
@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id!: number;

  @Column('varchar', { name: 'name', length: 100 })
  name!: string;

  @Column('varchar', { name: 'email', unique: true, length: 45 })
  email!: string;

  @Column('varchar', { name: 'password', nullable: true, length: 100 })
  password!: string;

  @Column('varchar', { name: 'confirmation_code', nullable: true, length: 100 })
  confirmationCode?: string;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date | null;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date | null;
}
