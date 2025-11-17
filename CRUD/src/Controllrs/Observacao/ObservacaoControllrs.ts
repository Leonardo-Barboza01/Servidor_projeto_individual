import { Request, Response } from 'express'
import { ObservacaoServices } from '../../Services/Observacao/ObservacaoServices'

class observacaoControllers{
    async cadastrarObservacao(req:Request, res: Response) {
        console.log("admim")
    }
}

export {observacaoControllers}