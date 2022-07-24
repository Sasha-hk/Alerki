import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from '@Src/app.module';

async function start() {
  const PORT = process.env.API_PORT || 5000;
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.use(cookieParser());

  // Setup swagger
  const config = new DocumentBuilder()
    .setTitle('Alerki')
    .setDescription('The Alerki API documentation')
    .setVersion('0.3.1')
    .addTag('alerki')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}

start();
