import {Request, Response} from 'express'
import { CategoriaServices } from '../../Services/Categoria/CategoriaServices'

class CategoriaControllers{
    async cadastrarCategoria(req:Request, res: Response) {
        const {nome} = req.body
        const enviarDados = new CategoriaServices()
        const resposta = await enviarDados.cadastrarCategoria({nome})
        return res.json(resposta)
    }
}

export {CategoriaControllers}