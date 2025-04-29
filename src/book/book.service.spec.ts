import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaService } from './../prisma2/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { where } from 'sequelize';

describe('BookService', () => {
  let service: BookService;
  let prisma;
  let mockPrisma = {
    book: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create book ', async () => {
    const dto: CreateBookDto = {
      name: 'ufq',
    };
    let createdDto = { id: 1, ...dto };
    prisma.book.create.mockResolvedValue(createdDto);
    expect(await service.create(dto)).toEqual(createdDto);
    expect(prisma.book.create).toHaveBeenCalledWith({ data: dto });
  });
  it('should get all book ', async () => {
    const books = [
      { id: 1, name: 'ufq' },
      { id: 2, name: 'ufq2' },
    ];
    prisma.book.findMany.mockResolvedValue(books);
    expect(await service.findAll()).toEqual(books);
    expect(prisma.book.findMany).toHaveBeenCalledWith();
  });
  it('should get one book', async () => {
    let one = { id: 1, name: 'ufq' };
    prisma.book.findFirst.mockResolvedValue(one);

    expect(await service.findOne(1)).toEqual(one);
    expect(prisma.book.findFirst).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update book', async () => {
    let one = { name: 'asd' };

    let updated = { id: 1, ...one };
    prisma.book.update.mockResolvedValue(updated);
    expect(await service.update(1, one)).toEqual(updated);
    expect(prisma.book.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: one,
    });
  });
  it('should delete book', async () => {
    let deleted = { id: 1, name: 'asd' };

    prisma.book.delete.mockResolvedValue(deleted);
    expect(await service.remove(1)).toEqual(deleted);
    expect(prisma.book.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
