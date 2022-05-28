import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookService } from '../book/book.service';
import { Book } from './entities/book.entity';
import { bookEntityMock } from './entities/book.mock';

const bookMock = bookEntityMock()

const booksList: Book[] = [...Array(3).keys()].map(() => bookEntityMock())

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn().mockResolvedValue(bookMock),
            findAll: jest.fn().mockResolvedValue(booksList),
            findOne: jest.fn().mockResolvedValue(bookMock),
            update: jest.fn().mockResolvedValue(bookMock),
            remove: jest.fn().mockResolvedValue(undefined),
          }
        }
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Should create a book register', async () => {
      const result = await service.create(bookMock)

      expect(result).toBe(bookMock)
      expect(service.create).toBeCalledTimes(1)
      expect(service.create).toBeCalledWith(bookMock)
    })

    it('should throw an exception', () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error())

      expect(service.create(bookEntityMock())).rejects.toThrowError()
    })
  })

});
