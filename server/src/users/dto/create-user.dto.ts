import { IsNotEmpty } from 'class-validator';

export class CreateCompany {
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  readonly phone: string;
  @IsNotEmpty()
  readonly nickname: string;
  @IsNotEmpty()
  readonly description: string;
  @IsNotEmpty()
  readonly position: string;
}
