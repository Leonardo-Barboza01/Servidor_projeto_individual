import {Request,Response} from 'express'
import { EnderecoServices } from "../../Services/Endereco/EnderecoServices";

class EnderecoControllers{
    async cadastrarEndereco(req:Request, res: Response) {
        console.log("admim")
    }
}
export {EnderecoControllers}