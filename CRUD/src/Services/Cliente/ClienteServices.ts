import prismaClient from "../../Prisma/PrismaClient";

interface cadClient {
    nome: string
    data_nascimento: number
    email: string
    senha: number
    status: boolean
}

    class ClientServices {
        async cadastrarClient ({nome, data_nascimento, email, senha, status}: cadClient){
            await prismaClient.client.create({
                data: {
                    nome: nome,
                    data_nascimento: data_nascimento,
                    email: email,
                    senha: senha,
                    status: status,
                }
            })
            return ({dados: 'Cadastro Efetivo com sucesso'})
        }
    }
    
    export {ClientServices}
