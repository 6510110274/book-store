import { Router } from 'express'

const apiRouter = Router()

apiRouter.get('/greet', (req, res) => {
    res.json({ msg: 'Hello world. greet' })
})

export default apiRouter