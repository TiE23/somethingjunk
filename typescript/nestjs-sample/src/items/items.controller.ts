import { Controller, Get, Post, Body, Param } from '@nestjs/common';
// import { Req, Res } from '@nestjs/common';
// import { Request, Response } from 'express';

import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  // This creates a GET endpoint for {{endpoint}}/items that returns what's in findAll().
  @Get()
  findAll(): string {
    return 'Get all items';
  }

  // Example of using route params. Here we have :id and retrieve it with another decorator.
  @Get(':id')
  findOne(@Param() param): string {
    return `Item ${param.id}`;
  }

  // "This is not really the NestJS way to do this..."
  // This is an example of how I would get the res and req of the route for express.
  // @Get()
  // findAll(@Req() req: Request, @Res() res: Response): Response {
  //   console.log(req.url);
  //   return res.send('hello world!!');
  // }

  // Using the DTO we now get to define the Body of the post request as taking
  // the form of the DTO
  @Post()
  create(@Body() createItemDto: CreateItemDto): string {
    return `Name: "${createItemDto.name}" Desc: "${createItemDto.desc}" Quantity: ${createItemDto.qty}`;
  }
}
