import { Controller, Get, Param, Res, HttpStatus, Post } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Pdf } from './pdf.entity';

@Controller('pdfs')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  async generateAllUsersPdf(@Res() res): Promise<void> {
    const pdf = await this.pdfService.generateAllUsersPdf();
    res.status(HttpStatus.CREATED).json(pdf);
  }

  @Get(':id')
  async getPdf(@Param('id') id: string, @Res() res): Promise<void> {
    const pdf = await this.pdfService.getPdf(Number(id));
    if (pdf) {
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${pdf.path.split('/').pop()}`,
        'Content-Length': require('fs').statSync(pdf.path).size,
      });
      require('fs').createReadStream(pdf.path).pipe(res);
    }
  }

  @Get()
  async findAll(): Promise<Pdf[]> {
    return this.pdfService.findAll();
  }

  @Get('latest/download')
  async getLatestPdf(@Res() res): Promise<void> {
    const pdf = await this.pdfService.getLatestPdf();
    if (pdf) {
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${pdf.path.split('/').pop()}`,
        'Content-Length': require('fs').statSync(pdf.path).size,
      });
      require('fs').createReadStream(pdf.path).pipe(res);
    }
  }
  
}
