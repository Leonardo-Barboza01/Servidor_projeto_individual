import {Request, Response} from 'express'
import {ProdutoServices} from '../../Services/Produto/ProdutoServices'

//CRUD - Completo - Produto

// C
class ProdutoControllers {


    async cadastrarProduto (req: Request, res: Response) {
        const {nome, preco, descricao, status, estoque, idCategoria} = req.body
        const enviarDados = new ProdutoServices()
        const resposta = await enviarDados.cadastrarProduto({
            nome,
            preco,
            descricao,
            status,
            estoque,
            idCategoria
        })
        return res.json(resposta)
    }

    // R 
        async visualizarProduto (req: Request, res: Response) {
            const enviarDados = new ProdutoServices()
            const resposta = await enviarDados.visualizarProduto()
            return res.json(resposta)
}

    // U 
        async alterarProduto (req: Request, res: Response) {
            const {id, nome, preco, descricao, estoque,categoria, status} = req.body
            const enviarDados = new ProdutoServices()
            const respota = await enviarDados.alterarProduto({
                id,
                nome,
                preco,
                descricao,
                estoque,
                categoria,
                status
            })
            return res.json(respota)
        }

        // D 
            async apagarProduto (req: Request, res: Response) {
                const {id} = req.params
                const enviarDados = new ProdutoServices()
                const resposta = await enviarDados.apagarProduto(id)
                return res.json(resposta)
            }
}
export {ProdutoControllers}

