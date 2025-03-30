import { BookRepository } from "./BookRepository"
import { CategoryRepository } from "./CategoryRepository"

const repositories = {
  categories: new CategoryRepository(),
  books:new BookRepository()
}

export default repositories