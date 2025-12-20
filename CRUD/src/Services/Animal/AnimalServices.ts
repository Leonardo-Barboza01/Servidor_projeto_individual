import prismaClient from '../../Prisma/PrismaClient'

interface cadAnimal {
    nome: string
    peso: string
    raca: string
    local: string
    status: boolean
    idCategoria: string 
}

interface alterarAnimal {
    id: string,
    nome: string,
    peso: string,
    raca: string,
    local: string,
    status: boolean
}

    class AnimalServices {
        async cadastrarAnimal ({nome, peso, raca, local, status, idCategoria} : cadAnimal){
            const animalExiste = await prismaClient.animal.findFirst({
                where: { nome : nome }
            })

            if (animalExiste) {
                throw new Error("Este animal já está cadastrado no sistema.")
            }

            const animal = await prismaClient.animal.create({
                data: {
                    nome: nome,
                    raca: raca,
                    peso: peso,
                    idCategoria: idCategoria,
                    local: local,
                    status: status
                    
                }
            })
            return ({dados: 'Cadastro Efetivo com sucesso'})
        }

        async visualizarAnimal() {
            const resposta = await prismaClient.animal.findMany({
                select: {
                    id: true,
                    nome: true,
                    raca: true,
                    peso: true,
                    local: true,
                    status: true
                }
            })
                return resposta
        }
        async apagarAnimal(id: string) {
            const idNãoexiste = await prismaClient.animal.findFirst({
                where: {
                    id: id
                }
            })
            if (!idNãoexiste) {
                throw new Error ('Registro não Encontrado')
            }

            await prismaClient.animal.delete({
                where: {
                    id: id
                }
            })
            return ({ dados: "Registro Excluido com sucesso"})
        }

        async alterarAnimal({id, nome, raca, peso, local, status}: alterarAnimal ) {
            await prismaClient.animal.update({
                where: {
                    id: id
                },
                    data: {
                        nome: nome,
                        raca: raca,
                        peso: peso,
                        local: local,
                        status: status
                    }
            })
            return ({ dados: 'Registro Alterado com sucesso'})
        }

    }
    export { AnimalServices }