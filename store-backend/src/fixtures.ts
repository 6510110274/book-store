import db from "./db"

async function loadFixtures(clearData = false) {
  if (clearData) {
    console.warn('clearing data')
    await db('book').del()
    await db('category').del()
    await db('author').del()
    await db('publisher').del()
  }

  // Insert category
  await db.batchInsert('category', [
    { id: 1, title: 'Fantasy' },
    { id: 2, title: 'Computer' },
  ])

  // Insert author
  await db.batchInsert('author', [
    { id: 1, name: 'J.K. Rowling' },
    { id: 2, name: 'George R.R. Martin' },
    { id: 3, name: 'Someone Else' },
  ])

  // Insert publisher
  await db.batchInsert('publisher', [
    { id: 1, name: 'Bloomsbury' },
    { id: 2, name: 'Bantam Books' },
  ])

  // Insert book (with author and publisher)
  await db.batchInsert('book', [
    { id: 1, title: 'Harry Potter', price: 560, stock_amount: 10, category_id: 1, author_id: 1, publisher_id: 1 },
    { id: 2, title: 'Game of Thrones', price: 520, stock_amount: 6, category_id: 1, author_id: 2, publisher_id: 2 },
    { id: 3, title: 'Node.js', price: 300, stock_amount: 4, category_id: 2, author_id: 3, publisher_id: 1 },
  ])
}

export default loadFixtures
