import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

// import keys from './config/keys';

@Module({
  // imports: [ItemsModule, MongooseModule.forRoot(keys.mongoUri)],
  imports: [
    ItemsModule,
    // https://docs.nestjs.com/techniques/database#typeorm-integration
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'itemDB.sqlite3', // It'll auto-generate on launch.
      entities: ['src/**/*/*.entity.ts'],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
