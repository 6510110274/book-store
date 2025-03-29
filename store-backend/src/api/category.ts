import { Router } from 'express'
import db from '../db'

const router = Router()

const makeQuery = () => db('category').select('*')
const findById = (id: number) => makeQuery().where({id})

router
    .get('/', async (req, res) => {
        const data = await makeQuery().orderBy('id')
        console.log(req.body)
        res.json(data) 
    })
    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const category = await findById(id).first()
        if(!category){
          res.status(404)
          res.json("Category not found")
          return 
        }
        res.json(category)
      })
export default router