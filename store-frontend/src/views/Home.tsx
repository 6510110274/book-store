import { useState, useEffect } from "react";
import Category from "../models/Category";
import Book from "../models/Book";
import Repo from '../repositories';
import BookDetail from "../components/BookDetial";
import BookForm from "../components/BookForm";

function Home() {
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

  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = Number(e.target.value);
    if (selectedCategoryId === 0) {
      setFilter({});
    } else {
      setFilter({ categoryId: selectedCategoryId });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Book List</h2>

      {/* Filter Section */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Filter by Category:</label>
        <select
          onChange={handleCategoryFilterChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={0}>All Categories</option>
          {categoryList.map(category => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {/* Book List */}
      <div className="space-y-6">
        {bookList.map(book => (
          <div
            key={book.id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <BookDetail {...book} />
            <BookForm
              book={book}
              categoryList={categoryList}
              authorList={[]}
              publisherList={[]}
              callbackFn={onUpdateBook}
            />
            <button
              onClick={() => onDeleteBook(book.id)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
