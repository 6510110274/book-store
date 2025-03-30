import express from 'express'
import db from '../db'
import { nestObject } from './utils'

const router = express.Router()

const makeQuery = () => db('book')
  .select(
    'book.*',
    'category.id as categoryId',
    'category.title as categoryTitle',
    'author.id as authorId',
    'author.name as authorName',
    'publisher.id as publisherId',
    'publisher.name as publisherName'
  )
  .leftJoin('category', 'book.category_id', 'category.id')
  .leftJoin('author', 'book.author_id', 'author.id')
  .leftJoin('publisher', 'book.publisher_id', 'publisher.id')

  router
    .get('/', async (req, res) => {
        try {
        const { categoryId, authorId, publisherId } = req.query
    
        let query = makeQuery()
    
        // เพิ่มเงื่อนไขถ้ามีค่าใน query string
        if (categoryId) {
            query = query.where('book.category_id', Number(categoryId))
        }
        if (authorId) {
            query = query.where('book.author_id', Number(authorId))
        }
        if (publisherId) {
            query = query.where('book.publisher_id', Number(publisherId))
        }
    
        const books = await query.orderBy('book.id')
    
        const nestedBooks = books.map(book =>
            nestObject(book, ['category', 'author', 'publisher'])
        )
    
        res.json(nestedBooks)
        } catch (err) {
        console.error('Error fetching books:', err)
        res.status(500).json({ error: 'Internal server error' })
        }
    })
  

export default router
