import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* By setting whitelist to true , any additional fields/properties that are passed to the request from client will be stripped automatically by NestJS. ValidationPipe will automatically remove all non-whitelisted properties, where “non-whitelisted” means properties without any validation decorators. It’s important to note that this option will filter all properties without validation decorators, even if they are defined in the DTO. */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const config = new DocumentBuilder()
    .setTitle('Nest Js Blog App')
    .setDescription('Nest Js Blog API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
