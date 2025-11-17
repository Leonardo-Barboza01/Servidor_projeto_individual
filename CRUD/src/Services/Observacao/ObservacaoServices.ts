import prismaClient from "../../Prisma/PrismaClient";

interface cadObservacao {
    nome: string
    status: boolean
}

    class ObservacaoServices {
        async cadastrarObservação({nome, status} : cadObservacao){
            await prismaClient.observacao.create({
                data: {
                    nome: nome,
                    status: status,
                }
            })
            return ({dados: 'Cadastro efetivo com sucesso'})
        }
    }
    export {ObservacaoServices}