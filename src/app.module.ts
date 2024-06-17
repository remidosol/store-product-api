import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "./config/config.service";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          type: "postgres",
          url: configService.getOrThrow("DATABASE_URL"),
          entities: [],
          synchronize: true,
          ssl: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
