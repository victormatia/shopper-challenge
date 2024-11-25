/* eslint-disable max-len */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  console.log('Adicionando usuário... \n');

  await prisma.customer.create({
    data: {
      id: 1,
      name: 'Victor Matias',
    },
  });

  console.log('Usuário criado! \n');

  console.log('Adicionando motoristas... \n');

  const drivers = await prisma.driver.createMany({
    data: [
      {
        id: 1,
        name: 'Homer Simpson',
        description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
        vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
        feePerKm: 2.5,
        minKm: 1,
      },
      {
        id: 2,
        name: 'Dominic Toretto',
        description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
        vehicle: 'Dodge Charger R/T 1970 modificado',
        feePerKm: 5.0,
        minKm: 5,
      },
      {
        id: 3,
        name: 'James Bond',
        description: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
        vehicle: 'Aston Martin DB5 clássico',
        feePerKm: 10.0,
        minKm: 10,
      },
    ],
  });

  console.log(`${drivers.count} motoristas foram adicionados!`, '\n');

  console.log('Adicionando avaliações... \n');

  const reviews = await prisma.review.createMany({
    data: [
      {
        driverId: 1,
        rating: 2,
        review: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
      },
      {
        driverId: 2,
        rating: 4,
        review: 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
      },
      {
        driverId: 3,
        rating: 5,
        review: 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
      },
    ],
  }); 

  console.log(`${reviews.count} avaliações foram adicionados!`, '\n');

  console.log('Banco de dados foi populado  com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
