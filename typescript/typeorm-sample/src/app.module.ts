import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: ["src/**/*/*.entity.ts"],
      autoLoadEntities: true,
      synchronize: true,
      database: "db.sqlite3",
      type: "sqlite",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
