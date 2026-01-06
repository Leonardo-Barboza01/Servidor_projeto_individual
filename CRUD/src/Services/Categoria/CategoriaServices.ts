import prismaClient from "../../Prisma/PrismaClient";

interface cadCategoria {
    nome: string
}
interface alterarCategoria {
    id: string,
    nome: string,
}

class CategoriaServices {

        // C
async cadastrarCategoria({ nome }: cadCategoria) {
    const categoriaExiste = await prismaClient.categoria.findFirst({
        where: {
            nome: nome
        }
    })
    
    if (categoriaExiste) {
        throw new Error("Esta categoria já está cadastrada.")
    }
    const resposta = await prismaClient.categoria.create({
        data: {
            nome: nome
        }
    })

    return { 
        mensagem: 'Categoria cadastrada com sucesso',
        id_gerado: resposta.id
    }
}
        // R
    async visualizarCategoria() {
    const categorias = await prismaClient.categoria.findMany();
    return categorias;
}



        // U
       async alterarCategoria({id, nome}: alterarCategoria ) {
            await prismaClient.categoria.update({
                where: {
                    id: id
                },
                    data: {
                        nome: nome,
                    }
            })
            return ({ dados: 'Registro Alterado com sucesso'})
        }

        // D
        async apagarCategoria(id: string) {
            const idNãoexiste = await prismaClient.categoria.findFirst({
                where: {
                    id: id
                }
            })
            if (!idNãoexiste) {
                throw new Error ('Registro não Encontrado')
            }

            await prismaClient.categoria.delete({
                where: {
                    id: id
                }
            })
            return ({ dados: "Registro Excluido com sucesso"})
        }

}
// Colocar depois, if para verificar se a categoria já existe.
   export { CategoriaServices }