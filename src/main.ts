import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors to allow requests from the frontend
  // app.enableCors({
  //   origin: process.env.ORIGIN,
  //   methods: 'GET,POST,PUT,DELETE',
  //   allowedHeaders: 'Content-Type, Authorization',
  // });

  const config = new DocumentBuilder()
    .setTitle('Holiday Calendar API') // Title of your API
    .setDescription('API documentation for Holiday Calendar') // Description of your API
    .setVersion('1.0') // Version of the API
    .addTag('holidays') // Optional: You can add tags for grouping related endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
