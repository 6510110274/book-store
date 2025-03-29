import { Router } from 'express'
import category from './category'

const apiRouter = Router()

apiRouter.get('/greet', (req, res) => {
    res.json({ msg: 'Hello world. greet' })
})

apiRouter.use('/category', category)

export default apiRouter