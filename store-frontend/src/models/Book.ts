import Category from "./Category";
import Author from "./Author";
import Publisher from "./Publisher";
// Book model interface

export default interface Book {
    id: number;
    title: string;
    price: number;
    stockAmount: number;
    category: Partial<Category>;
    author: Partial<Author>;
    publisher: Partial<Publisher>;
}