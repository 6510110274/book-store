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

    async get(id: string | number): Promise<Category | null> {
        try {
            const response = await axios.get<Category>(`${this.urlPrefix}/category/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching category with id ${id}:`, error);
            return null;
        }
    }
    async create(entity: Category): Promise<void> {
        try {
            const response = await axios.post<Category>(`${this.urlPrefix}/category`, entity);
            console.log("Category created:", response.data);
        } catch (error) {
            console.error("Error creating category:", error);
            throw error;
        }
    }
    async update(entity: Partial<Category>): Promise<void>{
        try {
            const response = await axios.put<Category>(`${this.urlPrefix}/category/${entity.id}`, entity);
            console.log("Category updated:", response.data);
        } catch (error) {
            console.error("Error updating category:", error);
        }
    }
    async delete(id: string|number): Promise<void>{
        try {
            const response = await axios.delete<Category>(`${this.urlPrefix}/category/${id}`);
            console.log("Category deleted:", response.data);
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }

}