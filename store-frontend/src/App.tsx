import { useState, useEffect } from "react";
import Category from "./models/Category";
import Repo from './repositories'
import BookDetail from "./components/BookDetial";

function App() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [title, setTitle] = useState('');
  const [id, setId] = useState<number | ''>('');

  const fetchCategoryList = async () => {
    const result = await Repo.categories.getAll();
    if (result) {
      setCategoryList(result);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const handleCreate = async () => {
    if (!title) return alert("Title is required");
    await Repo.categories.create({ title });
    setTitle('');
    fetchCategoryList();
  };

  const handleUpdate = async () => {
    if (!id || !title) return alert("ID and title are required");
    await Repo.categories.update({id, title });
    setId('');
    setTitle('');
    fetchCategoryList();
  };

  const handleDelete = async () => {
    if (!id) return alert("ID is required");
    await Repo.categories.delete(id);
    setId('');
    setTitle('');
    fetchCategoryList();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Category List</h1>

      <ul>
        {categoryList.map(category => (
          <li key={category.id}>{category.id}. {category.title}</li>
        ))}
      </ul>

      <hr />

      <h2>Manage Category</h2>

      <input
        type="number"
        placeholder="ID (for update/delete)"
        value={id}
        onChange={e => setId(e.target.value === '' ? '' : parseInt(e.target.value))}
      />
      <br />

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br /><br />

      <button onClick={handleCreate}>Create</button>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>

      <hr />
      <h2>Book List</h2>
      <BookDetail/>
    </div>
  );
}

export default App;
