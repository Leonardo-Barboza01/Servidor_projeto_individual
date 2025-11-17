import {Request, Response} from 'express'
import { CategoriaServices } from '../../Services/Categoria/CategoriaServices'

class CategoriaControllers{
    async cadastrarCategoria(req:Request, res: Response) {
        console.log("admim")
    }


}

export {CategoriaControllers}