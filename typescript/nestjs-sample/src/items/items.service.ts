import { Injectable } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';

// import { Item } from './interfaces/item.interface';
// import { Item as ItemClass, ItemDocument } from './schemas/item.schema';

import { Item } from './entity/item.entity';
import { Repository } from 'typeorm';

// Generated with `nest generate service items`

// Allows us to inject this as a dependency in a constructor
@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    return await this.itemsRepository.findOne({ where: { id } });
  }

  create(item: Item): Item {
    return this.itemsRepository.create(item);
  }

  async delete(id: number): Promise<Item> {
    const itemToDelete = await this.itemsRepository.findOne({ where: { id } });
    await this.itemsRepository.delete({ id });
    return itemToDelete;
  }

  async update(id: number, item: Item): Promise<Item> {
    await this.itemsRepository.update({ id }, item);
    return await this.itemsRepository.findOne({ where: { id } });
  }
}
