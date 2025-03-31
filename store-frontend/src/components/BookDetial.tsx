import { useEffect, useState } from "react";
import Book from "../models/Book";
import Category from "../models/Category";
import Repo from "../repositories";

function BookDetail() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");
  const [loading, setLoading] = useState(true);

  // โหลด category ทั้งหมด
  const fetchCategories = async () => {
    const result = await Repo.categories.getAll();
    if (result) {
      setCategories(result);
    }
  };

  // โหลดหนังสือตาม category ที่เลือก (หรือทั้งหมด)
  const fetchBooks = async (categoryId?: number) => {
    setLoading(true);
    const filter = categoryId ? { categoryId } : undefined;
    const result = await Repo.books.getAll(filter);
    if (result) {
      setBooks(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchBooks(); // เริ่มต้นโหลดทั้งหมด
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const categoryId = value === "" ? "" : parseInt(value);
    setSelectedCategory(categoryId);
    fetchBooks(categoryId === "" ? undefined : categoryId);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Book List</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Filter by category:&nbsp;
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">-- All Categories --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id} style={{ marginBottom: "1rem" }}>
              <strong>{book.title}</strong> - ฿{book.price} <br />
              <span>Stock: {book.stockAmount}</span>
              <br />
              <span>Category: {book.category?.title}</span>
              <br />
              <span>Author: {book.author?.name}</span>
              <br />
              <span>Publisher: {book.publisher?.name || "—"}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookDetail;
