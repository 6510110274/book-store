import { IRepository } from "./IRepositories";
import axios from "axios";
import config from "../config";
import Publisher from "../models/Publisher";

export class PublisherRepository implements IRepository<Publisher> {
    
    private urlPrefix: string = config.remoteRepositoryUrlPrefix;

    async getAll(filter?: any): Promise<Publisher[] | null> {
        try {
            const response = await axios.get<Publisher[]>(`${this.urlPrefix}/publisher`, { params: filter });
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return null;
        }
    }
    get(id: string | number): Promise<Publisher | null> {
        throw new Error("Method not implemented.");
    }
    create(entity: Publisher): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(entity: Partial<Publisher>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string | number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}