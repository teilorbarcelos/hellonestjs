import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from '../book/book.controller';
import { BookService } from '../book/book.service';
import { FindAllBookDto } from './dto/find-all-book.dto';
import { Book } from './entities/book.entity';
import { bookEntityMock } from './entities/book.mock';

const bookMock = bookEntityMock()

const booksList: Book[] = [...Array(3).keys()].map(() => bookEntityMock())

describe('BookController', () => {
  let controller: BookController;
  let service: BookService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
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

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Should create a book register', async () => {
      const result = await controller.create(bookMock)

      expect(result).toBe(bookMock)
      expect(controller.create).toBeCalledTimes(1)
      expect(controller.create).toBeCalledWith(bookMock)
    })

    it('should throw an exception', () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error())

      expect(controller.create(bookEntityMock())).rejects.toThrowError()
    })
  })

  describe('findAll', () => {
    it('Should have the books list in the return', async () => {
      const result = await controller.findAll({} as FindAllBookDto)

      expect(result).toBe(booksList)
      expect(controller.findAll).toBeCalledTimes(1)
    })

    it('should throw an exception', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error())

      expect(controller.findAll({} as FindAllBookDto)).rejects.toThrowError()
    })
  })

  describe('findOne', () => {
    it('Should have the books list in the return', async () => {
      const result = await controller.findOne('1')

      expect(result).toBe(bookMock)
      expect(controller.findOne).toBeCalledTimes(1)
      expect(controller.findOne).toBeCalledWith('1')
    })

    it('should throw an exception', () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error())

      expect(controller.findOne('1')).rejects.toThrowError()
    })
  })

  describe('update', () => {
    it('Should update a book register', async () => {
      const result = await controller.update('1', bookMock)

      expect(result).toBe(bookMock)
      expect(controller.update).toBeCalledTimes(1)
      expect(controller.update).toBeCalledWith(bookMock)
    })

    it('should throw an exception', () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error())

      expect(controller.update('1', bookMock)).rejects.toThrowError()
    })
  })

  describe('remove', () => {
    it('Should have the books list in the return', async () => {
      const result = await controller.remove('1')

      expect(result).toBeUndefined()
      expect(controller.remove).toBeCalledTimes(1)
      expect(controller.remove).toBeCalledWith('1')
    })

    it('should throw an exception', () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error())

      expect(controller.remove('1')).rejects.toThrowError()
    })
  })
})
