import { BookRepository } from "./BookRepository"
import { CategoryRepository } from "./CategoryRepository"
import { AuthorRepository } from "./AuthorRepository"
import { PublisherRepository } from "./PublisherRepository"

const repositories = {
  categories: new CategoryRepository(),
  books:new BookRepository(),
  authors: new AuthorRepository(),
  publishers: new PublisherRepository()
}

export default repositories