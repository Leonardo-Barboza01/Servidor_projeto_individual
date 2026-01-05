import prismaClient from "../../Prisma/PrismaClient";

interface cadCategoria {
    nome: string
}

class CategoriaServices {
    async cadastrarCategoria ({ nome }: cadCategoria){
       const resposta = await prismaClient.categoria.create({
            data: {
                nome: nome
            }
        })
        return ({ mensagem: 'Categoria cadastrada com sucesso',
                 id_gerado: resposta.id
                })
    } 
}
// Colocar depois, if para verificar se a categoria já existe.
   export { CategoriaServices }