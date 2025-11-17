import prismaClient from "../../Prisma/PrismaClient";

interface cadCategoria {
    nome: string
    status: boolean
}

class CategoriaServices {
    async cadastralAnimal ({nome, status}: cadCategoria){
        await prismaClient.Categoria.create({
            data: {
                nome: nome,
                status: status,
            }
        })
        return ({dados: 'Cadastro efetivo com sucesso'})
    } 
}

   export { CategoriaServices }