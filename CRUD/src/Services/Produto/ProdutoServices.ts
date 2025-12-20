import prismaClient from '../../Prisma/PrismaClient'

interface cadproduto {
    nome: string 
    preco: string 
    descricao: string 
    status: boolean 
    estoque: string
    idCategoria: string
}

    interface alterarProduto {
        id: string,
        nome: string,
        preco: number,
        descricao: string,
        idCategoria: string,
        estoque: number,
        status: boolean
    }

    class ProdutoServices {
        async cadastrarProduto ({nome, preco, descricao, status, estoque, idCategoria} : cadproduto) {
            const produtoExiste = await prismaClient.produto.findFirst({
                where: { nome : nome }
            })

            if (produtoExiste) {
                throw new Error("Produto já cadastrado")
            }

            const produto = await prismaClient.produto.create({
                data: {
                    nome: nome,
                    preco: preco,
                    descricao: descricao,
                    status: status,
                    estoque: estoque,
                    idCategoria : idCategoria
                }
            })
            return ({dados: 'Cadastro Efetivo com sucesso'})
        }

        async visualizarProduto() {
            const resposta = await prismaClient.produto.findMany({
                select: {
                    id: true,
                    nome: true,
                    preco: true,
                    descricao: true,
                    estoque: true,
                    status: true
                }
            })
                return resposta
        }
            async apagarProduto(id: string ) {
                const idnãoexiste = await prismaClient.produto.findFirst({
                    where: {
                        id: id 
                    }
                })
                if (!idnãoexiste) {
                    throw new Error ('Registro não Encontrado')
                }

                await prismaClient.produto.delete({
                    where: {
                        id: id 
                    }
                })
                return ({ dados: "Registro Excluido com sucesso"})
            }

            async alterarProduto({id, nome, preco, descricao, estoque ,status}: alterarProduto ) {
            await prismaClient.produto.update({
                where: {
                    id: id
                },
                    data: {
                        nome: nome,
                        preco: preco,
                        descricao: descricao,
                        estoque: estoque,
                        status: status
                    }
            })
            return ({ dados: 'Registro Alterado com sucesso'})
        }
   
    }
    export { ProdutoServices}
