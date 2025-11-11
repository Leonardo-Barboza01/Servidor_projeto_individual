import prismaClient from '../../Prisma/PrismaClient'

interface cadAnimal {
    nome: string
    peso: string
    raca: string
    status: boolean
    idAnimal: string
    
}

    class AnimalServices {
        async cadastrarAnimal ({nome, peso, raca, status} : cadAnimal){
            await prismaClient.animal.create({
                data: {
                    nome: nome,
                    peso: peso,
                    raca: raca,
                    status: status,
                    
                }
            })
            return ({dados: 'Cadastro Efetivo com sucesso'})
        }
    }
    
    export { AnimalServices }