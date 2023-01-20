import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Company extends Model {
  @Column
  name: string;
  @Column
  adress: string;
  @Column
  service: string;
  @Column
  numOfEmployees: string;
  @Column
  description: string;
  @Column
  type: string;
  @Column
  userId: string;
}
