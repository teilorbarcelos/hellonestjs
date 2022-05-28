import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateBookDto } from "../dto/create-book.dto";

export class IndexBookSwagger extends CreateBookDto { }

export class PartialIndexBookSwagger extends OmitType(CreateBookDto, ['id', 'bar_code']) { }

export class OptionalIndexBookSwagger extends PartialType(CreateBookDto) { }

export class OptionalPartialIndexBookSwagger extends PartialType(OmitType(CreateBookDto, ['id', 'bar_code'])) { }

export class SpecialIndexBookSwagger {
  @ApiProperty({ type: CreateBookDto, isArray: true })
  items: CreateBookDto[]
}
