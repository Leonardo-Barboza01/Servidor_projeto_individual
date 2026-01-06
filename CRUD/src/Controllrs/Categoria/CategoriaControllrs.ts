import {Request, Response} from 'express'
import { CategoriaServices } from '../../Services/Categoria/CategoriaServices'

class CategoriaControllers{
        // C
    async cadastrarCategoria(req:Request, res: Response) {
        const {nome} = req.body
        const enviarDados = new CategoriaServices()
        const resposta = await enviarDados.cadastrarCategoria({nome})
        return res.json(resposta)
    }

        // R
    async visualizarCategoria(req: Request, res: Response) {
    const enviarDados = new CategoriaServices();
    try {
        const resposta = await enviarDados.visualizarCategoria();
        return res.json(resposta);
    } catch (err: any) {
        return res.status(400).json({ erro: err.message }); 
        }
    }
    
    // U
   async alterarCategoria (req: Request, res: Response) {
           const {id, nome} = req.body
           const enviarDados = new CategoriaServices()
           const resposta = await enviarDados.alterarCategoria({
               id,
               nome
               
           })
           return res.json(resposta)

       }   
    // D
       async apagarCategoria(req: Request, res: Response) {
        const {id} = req.params
        const enviarDados = new CategoriaServices()
        try{
            const resposta = await enviarDados.apagarCategoria(id)
            return res.json(resposta);
        } catch (err : any) {
        // Se o Service lançar um erro, ele cai aqui
        return res.status(400).json({ erro: err.message } );
        }
    }
}

export {CategoriaControllers}