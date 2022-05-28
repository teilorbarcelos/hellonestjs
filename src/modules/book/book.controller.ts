import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FindAllBookDto } from './dto/find-all-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IndexBookSwagger, OptionalIndexBookSwagger } from './swagger/index-book.swagger';

@Controller('book')
@ApiTags('Books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  @ApiOperation({ summary: 'Endpoint responsável pelo cadastro de livros' })
  @ApiResponse({ status: 201, description: 'Sucesso no cadastro do livro', type: IndexBookSwagger })
  @ApiResponse({ status: 400, description: 'Falha ao cadastrar o livro' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Endpoint responsável por buscar Livros de acordo com a busca e filtros' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de livros com sucesso', type: OptionalIndexBookSwagger, isArray: true })
  @ApiResponse({ status: 400, description: 'Falha ao buscar os livros' })
  findAll(@Query() query: FindAllBookDto) {
    return this.bookService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Endpoint responsável por buscar o registro de um Livro através do seu ID' })
  @ApiResponse({ status: 200, description: 'Retorna o livro com sucesso', type: IndexBookSwagger })
  @ApiResponse({ status: 404, description: 'Falha ao buscar o livro' })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Endpoint responsável por atualizar o registro de um Livro através do seu ID' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de livros com sucesso', type: IndexBookSwagger })
  @ApiResponse({ status: 404, description: 'Falha ao buscar o livro' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Endpoint responsável por deletar o registro de um Livro através do seu ID' })
  @ApiResponse({ status: 204, description: 'Livro escluido com sucesso' })
  @ApiResponse({ status: 404, description: 'Falha ao buscar o livro' })
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
