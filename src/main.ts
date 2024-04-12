import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Sells Monitor API')
    .setDescription(
      'This api is for monitoring sells of a store. when a sell is made, the api will store the sell in the database and will send a notification to the storehouse.',
    )
    .setVersion('1.0')
    .addTag('Orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
