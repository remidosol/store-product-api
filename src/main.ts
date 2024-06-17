import { NestApplication, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication, NestExpressBodyParserOptions } from "@nestjs/platform-express";
import { ConfigService } from "./config/config.service";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ValidationErrorsInterceptor } from "./common/interceptors";
import helmet from "helmet";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ["log", "error", "warn", "debug", "verbose"],
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
      credentials: true,
    },
    rawBody: true,
  });

  app.setGlobalPrefix("api");

  const configService = app.get(ConfigService);
  const logger = new Logger(NestApplication.name);

  app.useGlobalInterceptors(new ValidationErrorsInterceptor());
  app.use(helmet({ contentSecurityPolicy: configService.getOrThrow("NODE_ENV") === "production" ? undefined : false }));

  app.set("trust proxy", true);
  app.useBodyParser("json", { limit: "5mb" } as NestExpressBodyParserOptions);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  const mainConf = new DocumentBuilder()
    .setTitle("Store Products API")
    .setDescription(
      "This is a simple API for managing products. It is built with NestJS, TypeORM, PostgreSQL, Swagger, and Docker."
    )
    .setVersion("1.0")
    .build();

  const mainDocument = SwaggerModule.createDocument(app, { ...mainConf });

  SwaggerModule.setup("api", app, mainDocument);

  // mongoose.set("debug", configService.getOrThrow("DEBUG") === "true");

  await app.listen(configService.getOrThrow("PORT"));

  logger.log(
    `Application is running on: http://${configService.getOrThrow("HOST") + ":" + configService.getOrThrow("PORT")}`
  );

  logger.log(
    `Swagger is running on: http://${
      configService.getOrThrow("HOST") + ":" + configService.getOrThrow("PORT") + "/api"
    }`
  );
}

bootstrap();
