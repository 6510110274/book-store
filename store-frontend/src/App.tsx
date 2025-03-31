import { useState, useEffect } from "react";
import Category from "./models/Category";
import Book from "./models/Book";
import Repo from './repositories';
import BookDetail from "./components/BookDetial";
import BookForm from "./components/BookForm";

function App() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [bookList, setBookList] = useState<Book[]>([]);
  const [filter, setFilter] = useState<{ categoryId?: number }>({});

  const fetchBookList = async () => {
    const result = await Repo.books.getAll(filter);
    if (result) {
      setBookList(result);
    }
  };

  const fetchCategoryList = async () => {
    const result = await Repo.categories.getAll();
    if (result) {
      setCategoryList(result);
    }
  };

  const onCreateBook = async (book: Partial<Book>) => {
    await Repo.books.create(book);
    fetchBookList();
  };

  const onUpdateBook = async (book: Partial<Book>) => {
    await Repo.books.update(book);
    fetchBookList();
  };

  const onDeleteBook = async (id: number) => {
    await Repo.books.delete(id);
    fetchBookList();
  };

  useEffect(() => {
    fetchCategoryList();
    fetchBookList();
  }, [filter]);

  // 🆕 Handler สำหรับ select filter
  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = Number(e.target.value);
    if (selectedCategoryId === 0) {
      setFilter({}); // แสดงทั้งหมด
    } else {
      setFilter({ categoryId: selectedCategoryId });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Book List</h2>

      {/* 🆕 ส่วนของ Filter */}
      <div style={{ marginBottom: '16px' }}>
        <label>Filter by Category: </label>
        <select onChange={handleCategoryFilterChange}>
          <option value={0}>All Categories</option>
          {categoryList.map(category => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {/* รายการหนังสือ */}
      {bookList.map(book => (
        <div key={book.id}>
          <BookDetail {...book} />
          <BookForm
            book={book}
            categoryList={categoryList}
            authorList={[]} 
            publisherList={[]}
            callbackFn={onUpdateBook}
          />
          <button onClick={() => onDeleteBook(book.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
