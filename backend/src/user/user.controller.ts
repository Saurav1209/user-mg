import { Controller, Get, Post, Body, Put, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Response } from 'express';
import * as pdf from 'html-pdf';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Post(':id/pdf')
  async generatePDF(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const user = this.userService.findOne(+id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const html = `
      <html>
        <head>
          <title>User Information</title>
        </head>
        <body>
          <h1>User Information</h1>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone Number:</strong> ${user.phoneNumber}</p>
          <p><strong>Address:</strong> ${user.address}</p>
        </body>
      </html>
    `;

    pdf.create(html).toStream((err, stream) => {
      if (err) {
        res.status(500).send('Error generating PDF');
        return;
      }
      res.setHeader('Content-Type', 'application/pdf');
      stream.pipe(res);
    });
  }

  @Get(':id/pdf')
  async retrievePDF(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const user = this.userService.findOne(+id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const html = `
      <html>
        <head>
          <title>User Information</title>
        </head>
        <body>
          <h1>User Information</h1>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone Number:</strong> ${user.phoneNumber}</p>
          <p><strong>Address:</strong> ${user.address}</p>
        </body>
      </html>
    `;

    pdf.create(html).toBuffer((err, buffer) => {
      if (err) {
        res.status(500).send('Error generating PDF');
        return;
      }
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=user.pdf');
      res.send(buffer);
    });
  }
}
