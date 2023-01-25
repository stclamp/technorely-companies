import { IsNotEmpty, ValidateIf } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @ValidateIf((o) => o !== '')
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  firstName: string;

  @Column()
  @IsNotEmpty()
  lastName: string;

  @Column()
  @IsNotEmpty()
  phone: string;

  @Column()
  @IsNotEmpty()
  nickname: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  position: string;
}
