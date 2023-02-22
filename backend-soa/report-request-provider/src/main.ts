import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { provider_host } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {retryAttempts: 5, retryDelay: 3000, host: provider_host, port: 3002}
  });
  await app.startAllMicroservices();
}
bootstrap();
