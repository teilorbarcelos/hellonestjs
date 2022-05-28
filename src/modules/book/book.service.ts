import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FindAllBookDto } from './dto/find-all-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateBookDto) {
    const bookExists = await this.prisma.book.findFirst({ where: { bar_code: data.bar_code } })

    if (bookExists) throw new Error("Book already exists")

    const book = await this.prisma.book.create({ data })

    return book;
  }

  async findAll(query: FindAllBookDto) {
    const books = await this.prisma.book.findMany({
      where: {
        AND: [
          {
            title: {
              contains: query.title,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: query.description,
              mode: 'insensitive'
            }
          },
          {
            bar_code: {
              contains: query.bar_code
            }
          },
          {
            OR: [
              {
                title: {
                  contains: query.search,
                  mode: 'insensitive'
                }
              },
              {
                description: {
                  contains: query.search,
                  mode: 'insensitive'
                }
              },
              {
                bar_code: {
                  contains: query.search
                }
              }
            ]
          }
        ]
      },

    })
    return books;
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findFirst({
      where: {
        id
      }
    })
    return book;
  }

  async update(id: string, data: UpdateBookDto) {
    const book = await this.prisma.book.update({
      where: {
        id
      },
      data
    })
    return book;
  }

  async remove(id: string) {
    await this.prisma.book.delete({
      where: {
        id
      }
    })
    return undefined;
  }
}
