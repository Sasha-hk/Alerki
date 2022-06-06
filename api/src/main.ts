import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT || 5000;
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  app.useGlobalPipes(new ValidationPipe());
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
