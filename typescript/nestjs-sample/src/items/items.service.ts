import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Item } from './interfaces/item.interface';
import { Item as ItemClass, ItemDocument } from './schemas/item.schema';

// Generated with `nest generate service items`

// Allows us to inject this as a dependency in a constructor
@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(ItemClass.name) private itemModel: Model<ItemDocument>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async delete(id: string): Promise<Item> {
    /**
     * Hard to find anyone talking about the reason to use delete or remove...
     * https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete
     * https://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
     */
    // return await this.itemModel.findByIdAndDelete(id);
    return await this.itemModel.findByIdAndRemove(id);
  }

  async update(id: string, item: Item): Promise<Item> {
    // query option "new: true" returns the updated data. Else it returns old data.
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
