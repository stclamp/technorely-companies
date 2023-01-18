import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { ChangeCompany } from './dto/change-company.dto';
import { CreateCompany } from './dto/create-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  getAllCompanies() {
    return this.companyService.findAll();
  }

  @Get(':id')
  getOneCompany(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createCompany(@Body() createCompany: CreateCompany) {
    return this.companyService.create(createCompany);
  }

  @Patch(':id')
  changeCompany(
    @Body() changeCopmpany: ChangeCompany,
    @Param('id') id: string,
  ) {
    return this.companyService.update(id, changeCopmpany);
  }

  @Delete(':id')
  deleteCompany(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
