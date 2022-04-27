import { Controller, Get, Post, Body } from '@nestjs/common';

import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  // This creates a GET endpoint for {{endpoint}}/items that returns what's in findAll().
  @Get()
  findAll(): string {
    return 'Get all items';
  }

  // Using the DTO we now get to define the Body of the post request as taking
  // the form of the DTO
  @Post()
  create(@Body() createItemDto: CreateItemDto): string {
    return `Name: "${createItemDto.name}" Desc: "${createItemDto.desc}" Quantity: ${createItemDto.qty}`;
  }
}
