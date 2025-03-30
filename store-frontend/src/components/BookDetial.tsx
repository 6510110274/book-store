import { useEffect, useState } from "react";
import Book from "../models/Book";
import Repo from "../repositories";

function BookDetail() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    const result = await Repo.books.getAll(undefined);
    if (result) {
      setBooks(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>📚 Book List</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id} style={{ marginBottom: '1rem' }}>
              <strong>{book.title}</strong> - ฿{book.price}<br />
              <span>Stock: {book.stockAmount}</span><br />
              <span>Category: {book.category?.title}</span><br />
              <span>Author: {book.author?.name}</span><br />
              <span>Publisher: {book.publisher?.name || '—'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookDetail;
