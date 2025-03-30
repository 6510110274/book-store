import { Router } from 'express'
import category from './category'
import book from './book'

const apiRouter = Router()

apiRouter.get('/greet', (req, res) => {
    res.json({ msg: 'Hello world. greet' })
})

apiRouter.use('/category', category)
apiRouter.use('/book', book)

export default apiRouter