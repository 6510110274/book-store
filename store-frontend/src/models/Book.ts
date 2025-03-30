import Category from "./Category";

export default interface Book {
    id: number;
    title: string;
    price: number;
    stockAmount: number;
    category: Partial<Category>;
    author: { id: number; name: string };
    publisher: { id: number; name: string };
}