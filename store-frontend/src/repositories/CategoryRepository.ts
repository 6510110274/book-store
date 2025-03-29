import Category from "../models/Category";
import { IRepository } from "./IRepositories";
import axios from "axios";
import config from "../config";

export class CategoryRepository implements IRepository<Category> {
    private urlPrefix: string = config.remoteRepositoryUrlPrefix;

    async getAll(filter?: any): Promise<Category[] | null> {
        try {
            const response = await axios.get<Category[]>(`${this.urlPrefix}/category`, { params: filter });
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return null;
        }
    }
}