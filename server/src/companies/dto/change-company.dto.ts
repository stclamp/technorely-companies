import { IsNotEmpty } from 'class-validator';

export class ChangeCompany {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly adress: string;
  @IsNotEmpty()
  readonly service: string;
  @IsNotEmpty()
  readonly numOfEmployees: string;
  @IsNotEmpty()
  readonly description: string;
  @IsNotEmpty()
  readonly type: string;
}
