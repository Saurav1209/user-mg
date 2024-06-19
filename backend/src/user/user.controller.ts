import { Controller, Get, Post, Body, Put, Param, Delete, Res, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Response } from 'express';
// import * as pdf from 'html-pdf';
import * as PDFDocument from 'pdfkit';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.userService.findOne(+id);
  }

  @Post()
  create(@Body() user: User): User {
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: User): User {
    return this.userService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    this.userService.remove(+id);
  }

  @Get('pdf/generate')
  async generatePDF(@Res() res: Response, @Query('download') download: string): Promise<void> {
    const users = this.userService.findAll();

    const doc = new PDFDocument();
    const filename = 'users.pdf';

    if (download) {
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    } else {
      res.setHeader('Content-Disposition', `inline; filename=${filename}`);
    }

    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(20).text('User Information', { align: 'center' }).moveDown(2.5);

    const pageWidth = 595; // Width of the A4 page in points
    const rightMargin = 20; // Desired right margin in points
    const tableTop = 100;
    const itemMargin = 30;
    const itemHeight = 30;
    const colWidths = [50, 100, 150, 100, 175]; // Adjusted last column width to leave 20-point right margin

    // Draw table headers
    doc.fontSize(12).text('S.No', 50, tableTop, { width: colWidths[0], align: 'left' });
    doc.fontSize(12).text('Name', 100, tableTop, { width: colWidths[1], align: 'left' });
    doc.fontSize(12).text('Email', 200, tableTop, { width: colWidths[2], align: 'left' });
    doc.fontSize(12).text('Phone Number', 350, tableTop, { width: colWidths[3], align: 'left' });
    doc.fontSize(12).text('Address', 450, tableTop, { width: colWidths[4], align: 'left' });

    // Draw table rows
    users.forEach((user, index) => {
      const y = tableTop + itemMargin + index * itemHeight;
      doc.fontSize(10).text(`${index + 1}`, 50, y, { width: colWidths[0], align: 'left' }); // Serial number
      doc.fontSize(10).text(user.name, 100, y, { width: colWidths[1], align: 'left' });
      doc.fontSize(10).text(user.email, 200, y, { width: colWidths[2], align: 'left' });
      doc.fontSize(10).text(user.phoneNumber, 350, y, { width: colWidths[3], align: 'left' });
      doc.fontSize(10).text(user.address, 450, y, { width: colWidths[4], align: 'left' });
    });

    doc.end();
  }

}
