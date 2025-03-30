import { Router } from 'express'
import db from '../db'

const router = Router()

const makeQuery = () => db('category').select('*')
const findById = (id: number) => makeQuery().where({id})

router
    .get('/', async (req, res) => {
        const data = await makeQuery().orderBy('id')
        res.json(data) 
    })
    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const category = await findById(id).first()
        if(!category){
          res.status(404).json("Category not found")
          return 
        }
        res.json(category)
    })

    .post('/', async (req, res) => {
        const { title } = req.body
  
        const result = await db('category').insert({ title })
        if(result.length <= 0){
            res.status(400).json("Category not created")
            console.log("Category not created")
            return 
        }
        console.log(result)
        res.status(201).json(result)
    })

    // post when id is not auto incremented
    // .post('/', async (req, res) => {
    //     const { id,title } = req.body
    //         if (!id || !title) {
    //             res.status(400).json({ error: 'id and title are required' });
    //             return 
    //         }
    //     const result = await db('category').insert({ id, title });
    //     if(result.length <= 0){
    //         console.log("Category not created");
    //         res.status(400).json({ error: "Category not created" });
    //         return 
    //     }
    //     console.log("Inserted ID:", result[0]);
    //     res.status(201).json({ id: result[0], title });
    // })

    .put('/:id', async (req, res) => {
        const id = parseInt(req.params.id)

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' })
            return
        }
        delete req.body.id
        const rowUpdated = await findById(id).update(req.body)
        if(rowUpdated == 0){
            res.status(404).json("Category not found")
            return
        }
        const updatedCategory = await db('category').where({ id }).first()
        res.json(updatedCategory)
    })
    
    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        if (isNaN(id)) {
           res.status(400).json({ error: 'Invalid ID' })
           return
        }

        const rowDeleted = await findById(id).del()
        
        if (rowDeleted === 0) {
            res.status(404).json({ error: 'Category not found' })
            return
        }
        res.json({ statusCode: rowDeleted > 0 ? 1 : 0, message: 'Category deleted' })
    })

export default router