import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // 1. Security Headers (Helmet) - MUST be first
  app.use(helmet());

  // 2. CORS (Cross-Origin Resource Sharing)
  app.enableCors({
    origin: '*', // In production, replace with specific domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // 3. Global Prefix
  app.setGlobalPrefix('api/v1');

  // 4. Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 5. Interceptors & Filters
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  // 6. Swagger
  const config = new DocumentBuilder()
    .setTitle('Mercenary API')
    .setDescription('Professional NestJS Starter for Rapid Development')
    .setVersion('1.0')
    .addBearerAuth() // Adds the "Authorize" button for JWT later
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 7. Start
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Mercenary API running on port ${port}`);
  logger.log(`Swagger Docs available at http://localhost:${port}/api/docs`);
}
bootstrap();