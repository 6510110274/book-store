import Book from "../models/Book";
import { IRepository } from "./IRepositories";
import config from "../config";
import axios from "axios";

export class BookRepository implements IRepository<Book> {
    private urlPrefix: string = config.remoteRepositoryUrlPrefix;

    async getAll(filter?: any | undefined): Promise<Book[] | null> {
        try {
            const response = await axios.get<Book[]>(`${this.urlPrefix}/book`, { params: filter });
            return response.data;
        } catch (error) {
            console.error("Error fetching books:", error);
            return null;
        }
    }
    async get(id: string | number): Promise<Book | null> {
        try {
            const response = await axios.get<Book>(`${this.urlPrefix}/book/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching book with id ${id}:`, error);
            return null;
        }
    }

    async create(entity: Partial<Book>): Promise<void> {
        try {
            await axios.post(`${this.urlPrefix}/book`, entity);
        } catch (error) {
            console.error("Error creating book:", error);
            throw error;
        }
    }

    async update(entity: Partial<Book>): Promise<void> {
        if (!entity.id) {
            throw new Error("Book ID is required for update.");
        }
        try {
            await axios.put(`${this.urlPrefix}/book/${entity.id}`, entity);
        } catch (error) {
            console.error(`Error updating book with id ${entity.id}:`, error);
            throw error;
        }
    }

    async delete(id: string | number): Promise<void> {
        try {
            await axios.delete(`${this.urlPrefix}/book/${id}`);
        } catch (error) {
            console.error(`Error deleting book with id ${id}:`, error);
            throw error;
        }
    }
}