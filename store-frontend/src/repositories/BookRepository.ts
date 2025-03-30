import Book from "../models/Book";
import { IRepository } from "./IRepositories";
import config from "../config";
import axios from "axios";

export class BookRepository implements IRepository<Book> {
    private urlPrefix: string = config.remoteRepositoryUrlPrefix;

    async getAll(filter: any | undefined): Promise<Book[] | null> {
        try {
            const response = await axios.get<Book[]>(`${this.urlPrefix}/book`, { params: filter });
            return response.data;
        } catch (error) {
            console.error("Error fetching books:", error);
            return null;
        }
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