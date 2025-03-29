import { Router } from 'express'
import db from '../db'

const router = Router()

router
    .get('/', async (req, res) => {
        const data = await db('category').select('*').orderBy('id')
        console.log(req.body)
        res.json(data) 
    })

export default router