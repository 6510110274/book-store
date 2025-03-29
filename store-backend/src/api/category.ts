import { Router } from 'express'

const router = Router()

router
    .get('/', (req, res) => {
        res.json([
            { id: 1, name: 'Electronics' },
            { id: 2, name: 'Books' },
            { id: 3, name: 'Clothing' },
            { id: 4, name: 'Sports' },
        ])
    })
    
export default router