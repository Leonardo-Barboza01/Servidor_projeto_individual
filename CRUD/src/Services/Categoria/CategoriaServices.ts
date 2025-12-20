import prismaClient from "../../Prisma/PrismaClient";

interface cadCategoria {
    nome: string
}

class CategoriaServices {
    async cadastrarCategoria ({ nome }: cadCategoria){
        await prismaClient.categoria.create({
            data: {
                nome: nome
            }
        })
        return ({dados: 'Cadastro efetivo com sucesso'})
    } 
}

   export { CategoriaServices }