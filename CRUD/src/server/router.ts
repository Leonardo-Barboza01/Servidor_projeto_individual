import {Router} from 'express'

// Importação de controlls

import { CategoriaControllers } from '../Controllrs/Categoria/CategoriaControllrs'
import { AnimalControllers } from '../Controllrs/Animal/AnimalControlls'
// import { ProdutoControllers} from'../Controllrs/Produto/produtosControlls'
const router = Router()

// Metado POST - 
router.post('/CadastrarAnimal', new AnimalControllers().cadastrarAnimal)
//router.post('CadastrarCategoria' ,  new CategoriaControllers().cadastrarCategoria)
//router.post('CadastrarProdutos' new produtosControllers().CadastrarProduto)

// Metodo GET - 
router.get('/VisualizarAnimal', new AnimalControllers().cadastrarAnimal)
 //router.get('VisualizarProduto', new AnimalControllers().cadastrarProduto)

// Metado PUT - 
router.get('AlterarAnimal' , new AnimalControllers().alterarAnimal)
//router.get('AlterarProduto' , new ProdutosControllers().alterarProduto)

// Metedo Delete - 
router.delete('ApagarAnimal/:id', new AnimalControllers().apagarAnimal)
//router.delete('ApagarProduto/:id' , new ProdutoControllers().apagarProdutos)
export default router