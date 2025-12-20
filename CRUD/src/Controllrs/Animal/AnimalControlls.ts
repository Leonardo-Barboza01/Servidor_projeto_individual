import { Request, Response} from 'express'
import {AnimalServices} from '../../Services/Animal/AnimalServices'

//CRUD

// C
class AnimalControllers{
    async cadastrarAnimal(req:Request, res: Response) {
        const {nome, raca, peso, local, status, idCategoria} = req.body
        const enviarDados = new AnimalServices()
        const resposta = await enviarDados.cadastrarAnimal({
            nome,
            peso,
            raca,
            local,
            status,
            idCategoria
        })
        return res.json(resposta)
    }
// R
    async visualziarAnimal(req: Request, res: Response){
        const enviarDados = new AnimalServices()
        const resposta = await enviarDados.visualizarAnimal()
        return res.json(resposta)
    }

// U 
    async alterarAnimal (req: Request, res: Response) {
        const {id, nome, peso, raca, local, status} = req.body
        const enviarDados = new AnimalServices()
        const resposta = await enviarDados.alterarAnimal({
            id,
            nome,
            raca,
            local,
            peso,
            status,
        })
        return res.json(resposta)
    }   

// D
    async apagarAnimal(req: Request, res: Response) {
        const {id} = req.params
        const enviarDados = new AnimalServices()
        const resposta = await enviarDados.apagarAnimal(id)
        return res.json(resposta)
    }
}
export {AnimalControllers}

