import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { Pdf } from './pdf.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pdf]), UserModule],
  providers: [PdfService],
  controllers: [PdfController],
})
export class PdfModule {}
