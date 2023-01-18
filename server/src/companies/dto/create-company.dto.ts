import { IsNotEmpty } from 'class-validator';

export class CreateCompany {
  @IsNotEmpty()
  readonly email: string;
}
