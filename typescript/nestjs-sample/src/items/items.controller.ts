import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
// import { Req, Res } from '@nestjs/common';
// import { Request, Response } from 'express';

// import { Item } from './interfaces/item.interface';

import { Item } from './entity/item.entity';

// import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  // Here we inject our dependencies
  constructor(private readonly itemsService: ItemsService) {}

  // This creates a GET endpoint for {{endpoint}}/items that returns what's in findAll().
  @Get()
  findAll(): Promise<Item[]> {
    // Injected dependency is accessible, and we can grab the data with findAll() method.
    return this.itemsService.findAll();
  }

  // Example of using route params. Here we have :id and retrieve it with another decorator.
  @Get(':id')
  findOne(@Param() param: { id: number }): Promise<Item> {
    return this.itemsService.findOne(param.id);
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
  create(@Body() item: Item): Item {
    return this.itemsService.create(item);
  }

  // Here we demonstrate how we can retrieve a param directly.
  @Delete(':id')
  delete(@Param('id') id: number): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateItem: Item): Promise<Item> {
    return this.itemsService.update(id, updateItem);
  }
}
