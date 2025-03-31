import { IRepository } from "./IRepositories";
import axios from "axios";
import config from "../config";
import Author from "../models/Author";

export class AuthorRepository implements IRepository<Author> {
    
    private urlPrefix: string = config.remoteRepositoryUrlPrefix;

    async getAll(filter?: any): Promise<Author[] | null> {
        try {
            const response = await axios.get<Author[]>(`${this.urlPrefix}/publisher`, { params: filter });
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return null;
        }
    }
    get(id: string | number): Promise<Author | null> {
        throw new Error("Method not implemented.");
    }
    create(entity: Author): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(entity: Partial<Author>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string | number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}