import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Enable CORS
  app.enableCors({
  origin: process.env.CLIENT_URL, // Angular development server
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
