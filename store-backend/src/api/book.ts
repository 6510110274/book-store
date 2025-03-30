import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.json({ msg: 'Hello world. greet' })
})

export default router