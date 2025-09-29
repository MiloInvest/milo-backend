// src/users/dtos/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'Nome completo do usuário.',
        example: 'João da Silva',
    })
    @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'E-mail único do usuário para login.',
        example: 'joao.silva@email.com',
    })
    @IsNotEmpty({ message: 'O e-mail não pode ser vazio.' })
    @IsEmail({}, { message: 'Formato de e-mail inválido.' })
    email: string;

    @ApiProperty({
        description: 'Senha de acesso do usuário. Mínimo de 8 caracteres.',
        example: 'S3nh@F0rt3!',
        minLength: 8,
    })
    @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
    @IsString()
    @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
    password: string;
}
