import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
};

describe('UserService', () => {
    let service: UserService;
    let repository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));

        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        const createUserDto = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
        };
        const user = new User();
        Object.assign(user, createUserDto, { id: 'algum-uuid' });

        it('deve criar um novo usuário com sucesso', async () => {
            mockUserRepository.findOne.mockResolvedValue(null);
            mockUserRepository.create.mockReturnValue(user);
            mockUserRepository.save.mockResolvedValue(user);

            const result = await service.create(createUserDto);

            expect(result).toEqual(user);
            expect(repository.findOne).toHaveBeenCalledWith({ where: { email: createUserDto.email } });
            expect(repository.create).toHaveBeenCalledWith(createUserDto);
            expect(repository.save).toHaveBeenCalledWith(user);
        });

        it('exists deve retornar um ConflictException se o email já existir', async () => {
            mockUserRepository.findOne.mockResolvedValue(user);

            await expect(service.create(createUserDto)).rejects.toThrow(ConflictException);
            await expect(service.create(createUserDto)).rejects.toThrow('Este e-mail já está em uso.');

            expect(repository.findOne).toHaveBeenCalledWith({ where: { email: createUserDto.email } });
            expect(repository.create).not.toHaveBeenCalled();
            expect(repository.save).not.toHaveBeenCalled();
        });
    });
});
