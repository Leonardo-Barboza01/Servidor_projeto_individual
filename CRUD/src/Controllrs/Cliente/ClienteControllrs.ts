import {Request, Response} from 'express'
import { ClientServices } from '../../Services/Cliente/ClienteServices'

class ClientControllers {
    async cadastrarClient(req:Request, res: Response) {
        console.log("admim")
    }
}

export {ClientControllers}