import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your frontend URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', //we probably need to change this to declare the methods we want to allow and origins from a CONST/CONFIG file5
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
