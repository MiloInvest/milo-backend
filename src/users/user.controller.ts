// src/users/user.controller.ts

import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário na plataforma.' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'O usuário foi criado com sucesso.',
        type: User,
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'O e-mail informado já está em uso.',
    })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }
}
