// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('API da Plataforma "Ativo"')
        .setDescription('Documentação completa da API para gerenciamento de carteiras de investimentos.')
        .setVersion('1.0')
        .addTag('users', 'Operações relacionadas a usuários')
        .addTag('portfolio', 'Operações relacionadas à carteira do usuário')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);


    await app.listen(3000);
}
bootstrap();
