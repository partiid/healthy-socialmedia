import actions from "../data/actions";
import { PrismaClient } from "@prisma/notifications-client";
const Prisma = new PrismaClient(); 


const seedResources = async () => {
    for(let action of actions) {
        await Prisma.resource.create({
            data: {
                name: action.name
            }
        })
    }
}

const seedActions = async () => {
    for(let action of actions) {
        await Prisma.action.create({
            data: {
                name: action.name,
                resources: {
                    connect: {
                        id_resource: action.id_resource
                    }
                }
            }
        })
    }
}

const seed = async () => {
    await seedResources();
    await seedActions();

}

seed()
    .then(async () => {
        await Prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await Prisma.$disconnect();
        process.exit(1);
    });