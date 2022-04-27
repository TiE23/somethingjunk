import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ItemDocument = Item & Document;

/**
 * Take note that this decorator expects you to enter a singular name. It'll
 * add -s in the mongo collection.
 */
@Schema()
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop()
  desc: string;

  @Prop({ required: true })
  qty: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
