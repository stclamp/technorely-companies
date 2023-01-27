import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { ChangeCompany } from './dto/change-company.dto';
import { CreateCompany } from './dto/create-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  getAllCompanies(@Body('userId') userId: string) {
    return this.companyService.findAll(userId);
  }
  @Post('sort')
  getSortedData(@Body('sort') sort: string, @Body('userId') userId: string) {
    return this.companyService.sortBy(sort, userId);
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
  changeCompany(@Body() changeCompany: ChangeCompany, @Param('id') id: string) {
    return this.companyService.update(id, changeCompany);
  }

  @Delete(':id')
  deleteCompany(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
