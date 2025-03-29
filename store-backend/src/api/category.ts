import { Router } from 'express'
import db from '../db'

const router = Router()

router
    .get('/test', (req, res) => {
        res.json([
            { id: 1, name: 'Electronics' },
            { id: 2, name: 'Books' },
            { id: 3, name: 'Clothing' },
            { id: 4, name: 'Sports' },
        ])
    })
    .get('/db', async (req, res) => {
        const data = await db('category').select('*').orderBy('id')
        console.log(req.body)
        res.json(data) 
    })

export default router