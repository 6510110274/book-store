import { useState, useEffect} from "react";
import Category from "./models/Category";
import Repo from './repositories'

function App() {
  const [categoryList, setCategoryList] = useState<Category[]>([])

  const fetchCategoryList = async () => {
    const result = await Repo.categories.getAll()
    if (result) {
      setCategoryList(result)
    }
  }

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <div>
    <h1>Category List</h1>
      <ul>
        {categoryList.map(category => (
          <li key={category.id}>{category.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
