import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';
import { ChangeCompany } from './dto/change-company.dto';
import { CreateCompany } from './dto/create-company.dto';
import { Company } from './models/company.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company)
    private companyModel: typeof Company,
  ) {}

  async findAll(userId: string): Promise<Company[]> {
    return await this.companyModel.findAll({
      where: { userId: userId },
      order: ['id'],
    });
  }

  async sortBy(
    sort: string,
    userId: string,
    method: string,
  ): Promise<Company[]> {
    return await this.companyModel.findAll({
      where: { userId: userId },
      order: [[sort, method]],
    });
  }

  findOne(id: string): Promise<Company> {
    return this.companyModel.findOne({
      where: {
        id,
      },
    });
  }

  create(createCompany: CreateCompany): Promise<Company> {
    const company = new Company();

    company.name = createCompany.name;
    company.adress = createCompany.adress;
    company.service = createCompany.service;
    company.numOfEmployees = createCompany.numOfEmployees;
    company.description = createCompany.description;
    company.type = createCompany.type;
    company.userId = createCompany.userId;

    return company.save();
  }

  update(
    id: string,
    changeCompany: ChangeCompany,
  ): Promise<[affectedCount: number, affectedRows: Company[]]> {
    return this.companyModel.update(
      { ...changeCompany },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
  }

  async remove(id: string): Promise<void> {
    const company = await this.findOne(id);
    await company.destroy();
  }
}
