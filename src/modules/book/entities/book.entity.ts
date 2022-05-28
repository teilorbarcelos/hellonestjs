import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class Book {
  @ApiPropertyOptional()
  id?: string
  @ApiProperty()
  title: string
  @ApiProperty()
  description: string
  @ApiProperty()
  bar_code: string

  constructor(book?: Partial<Book>) {
    this.id = book?.id
    this.title = book?.title!
    this.description = book?.description!
    this.bar_code = book?.bar_code!
  }
}
