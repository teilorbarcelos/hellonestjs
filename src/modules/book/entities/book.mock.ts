import { datatype, random } from "src/hooks/fakerjs";
import { Book } from "./book.entity";

export const bookEntityMock = (): Book => new Book({
  id: datatype.uuid(),
  title: random.words(3),
  description: random.words(10),
  bar_code: datatype.uuid()
})
