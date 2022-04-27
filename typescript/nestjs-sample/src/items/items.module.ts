import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

/**
 * Defining a module here allows us to use it as an import for app.module.
 * This, as you can obviously tell, is a way to make for cleaner imports, so you
 * don't have a situation where a very mature product doesn't just have 500
 * imported controllers and providers and stuff like that.
 */

@Module({
  imports: [],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
