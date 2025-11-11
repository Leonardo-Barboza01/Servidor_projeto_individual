import {Router} from 'express'

import { AnimalControllers } from '../Controllrs/Animal/AnimalControlls'

const router = Router()

router.post('/CadastrarAnimal', new AnimalControllers().cadastrarAnimal)

export default router