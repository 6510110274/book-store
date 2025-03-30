import Book from "../models/Book";
import { IRepository } from "./IRepositories";

export class BookRepository implements IRepository<Book> {
    getAll(filter: any | undefined): Promise<Book[] | null> {
        throw new Error("Method not implemented.");
    }
    get(id: string | number): Promise<Book | null> {
        throw new Error("Method not implemented.");
    }
    create(entity: Book): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(entity: Partial<Book>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string | number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}