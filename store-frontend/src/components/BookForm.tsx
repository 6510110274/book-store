import { FormEvent, useRef } from "react";
import Book from "../models/Book";
import Category from "../models/Category";
import Author from "../models/Author";
import Publisher from "../models/Publisher";

interface Props {
  book: Partial<Book>,
  categoryList: Category[],
  authorList: Author[],
  publisherList: Publisher[],
  callbackFn: (book: Partial<Book>) => void
}

function BookForm(props:Props) {
  const titleRef= useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const stockAmountRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const authorRef = useRef<HTMLSelectElement>(null);
  const publisherRef =useRef<HTMLSelectElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.callbackFn({
      id: props.book.id,
      title: titleRef.current?.value,
      price: Number(priceRef.current?.value),
      stockAmount: Number(stockAmountRef.current?.value),
      category: {
        id: Number(categoryRef.current?.value)
      },
      author: {
        id: Number(authorRef.current?.value)
      },
      publisher: {
        id: Number(publisherRef.current?.value)
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        Title: <input type="text" defaultValue={props.book.title} ref={titleRef} required/>
      </div>
      <div>
        Price: <input type="number" step="0.01" min="0" defaultValue={props.book.price} ref={priceRef} />
      </div>
      <div>
        Stock Amount:  <input type="number" min="0" defaultValue={props.book.stockAmount} ref={stockAmountRef} />
      </div>
      <div>
        Category :
          <select defaultValue={props.book.category?.id} ref={categoryRef}>
            <option hidden></option>
            {props.categoryList.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
          </select>
      </div>
      <div>
        Author :
          <select defaultValue={props.book.author?.id} ref={authorRef}>
            <option hidden></option>
            {props.authorList.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
          </select>
      </div>
      <div>
        Publisher :
          <select defaultValue={props.book.publisher?.id} ref={categoryRef}>
            <option hidden></option>
            {props.publisherList.map(publisher => <option key={publisher.id} value={publisher.id}>{publisher.name}</option>)}
          </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default BookForm;
