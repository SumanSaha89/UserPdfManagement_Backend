import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as PDFDocument from 'pdfkit';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { Pdf } from './pdf.entity';
import * as fs from 'fs';

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(Pdf)
    private pdfRepository: Repository<Pdf>,
    private readonly userService: UserService,
  ) {}

  async generateAllUsersPdf(): Promise<Pdf> {
    const users: User[] = await this.userService.findAll();
    const doc = new PDFDocument();
    const pdfPath = `./pdfs/users_${Date.now()}.pdf`;

    if (!fs.existsSync('./pdfs')) {
      fs.mkdirSync('./pdfs');
    }

    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(25).text('All Users Information', { align: 'center' });
    doc.moveDown();
    users.forEach(user => {
      doc.fontSize(18).text(`Name: ${user.name}`);
      doc.fontSize(18).text(`Email: ${user.email}`);
      doc.fontSize(18).text(`Phone Number: ${user.phoneNumber}`);
      doc.fontSize(18).text(`Address: ${user.address}`);
      doc.moveDown();
    });

    doc.end();

    const newPdf = this.pdfRepository.create({
      path: pdfPath,
      userCount: users.length,
    });
    return this.pdfRepository.save(newPdf);
  }

  async getPdf(id: number): Promise<Pdf> {
    return this.pdfRepository.findOneBy({ id });
  }

  async findAll(): Promise<Pdf[]> {
    return this.pdfRepository.find();
  }

  async getLatestPdf(): Promise<Pdf> {
    const [latestPdf] = await this.pdfRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 1,
    });
    return latestPdf;
  }
}
