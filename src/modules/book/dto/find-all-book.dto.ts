import { ApiPropertyOptional } from "@nestjs/swagger"

export class FindAllBookDto {
  @ApiPropertyOptional()
  search?: string
  @ApiPropertyOptional()
  title?: string
  @ApiPropertyOptional()
  description?: string
  @ApiPropertyOptional()
  bar_code?: string
}
