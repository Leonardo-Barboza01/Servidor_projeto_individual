import {Router} from 'express'

// Importação de controlls

import { CategoriaControllers } from '../Controllrs/Categoria/CategoriaControllrs'
import { AnimalControllers } from '../Controllrs/Animal/AnimalControlls'
import { ProdutoControllers} from '../Controllrs/Produto/ProdutoControllers'

const router = Router()

// Metado POST - 
router.post('/CadastrarAnimal', new AnimalControllers().cadastrarAnimal)
router.post('/CadastrarCategoria' ,  new CategoriaControllers().cadastrarCategoria)
router.post('/CadastrarProduto' , new ProdutoControllers().cadastrarProduto)

// Metodo GET - 
router.get('/VisualizarAnimal', new AnimalControllers().visualziarAnimal)
router.get('/VisualizarProduto', new ProdutoControllers().visualizarProduto)

// Metado PUT - 
router.put('/AlterarAnimal' , new AnimalControllers().alterarAnimal)
router.put('/AlterarProduto' , new ProdutoControllers().alterarProduto)

// Metedo Delete - 
router.delete('/ApagarAnimal/:id', new AnimalControllers().apagarAnimal)
router.delete('/ApagarProduto/:id' , new ProdutoControllers().apagarProduto)
export default router