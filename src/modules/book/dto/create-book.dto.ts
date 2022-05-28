import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateBookDto {
  @ApiPropertyOptional()

  id?: string
  @ApiProperty()
  title: string
  @ApiProperty()
  description: string
  @ApiProperty()
  bar_code: string
}
