import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../src/users/entities/user.entity';

describe('UsersController (e2e)', () => {
    let app: INestApplication;
    let userRepository: Repository<User>;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideModule(TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [User],
                    synchronize: true,
                }),
            }))
            .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        userRepository = moduleFixture.get('UserRepository');
    });

    afterEach(async () => {
        await userRepository.clear();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/users (POST)', () => {
        const createUserDto = {
            name: 'E2E Test User',
            email: 'e2e-test@example.com',
            password: 'password123',
        };

        it('deve criar um novo usuário e retorná-lo', () => {
            return request(app.getHttpServer())
                .post('/users')
                .send(createUserDto)
                .expect(201)
                .then((response) => {
                    expect(response.body).toEqual({
                        id: expect.any(String),
                        name: createUserDto.name,
                        email: createUserDto.email,
                    });
                    expect(response.body.password).toBeUndefined();
                });
        });

        it('deve retornar um 409 Conflict se o email já existir', async () => {
            await request(app.getHttpServer()).post('/users').send(createUserDto);

            return request(app.getHttpServer())
                .post('/users')
                .send(createUserDto)
                .expect(409);
        });

        it('deve retornar um 400 Bad Request se os dados forem inválidos', () => {
            const invalidUser = { email: 'invalid-email', password: '123' };

            return request(app.getHttpServer())
                .post('/users')
                .send(invalidUser)
                .expect(400);
        });
    });
});
