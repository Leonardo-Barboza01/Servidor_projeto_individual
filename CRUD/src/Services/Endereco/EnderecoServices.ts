import prismaClient from '../../Prisma/PrismaClient'

interface cadEndereco {
    cep: number
    rua: string
    bairro:string
    numero:number

}

    class EnderecoServices {
        async cadastrarEndereco ({cep, rua, bairro, numero} : cadEndereco){
            await prismaClient.endereco.create({
                data: {
                    cep: cep,
                    rua: rua,
                    bairro: bairro,
                    numero: numero,

                }
            })
            return({dados: 'Cadastro efetivo com sucesso'})
        }
    }
    export {EnderecoServices}