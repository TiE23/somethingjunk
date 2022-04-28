import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
// import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

// import { Item, ItemSchema } from './schemas/item.schema';
import { Item } from './entity/item.entity';

/**
 * Defining a module here allows us to use it as an import for app.module.
 * This, as you can obviously tell, is a way to make for cleaner imports, so you
 * don't have a situation where a very mature product doesn't just have 500
 * imported controllers and providers and stuff like that.
 */

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    TypeOrmModule.forFeature([Item]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
