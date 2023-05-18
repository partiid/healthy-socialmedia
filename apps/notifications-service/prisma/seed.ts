import actions from "../data/actions";
import resources from "../data/resources";
import { PrismaClient } from "@prisma/notifications-client";
const Prisma = new PrismaClient(); 


const seedResources = async () => {
    for(let resource of resources) {
        await Prisma.resource.create({
            data: {
                name: resource.name
            }
        })
    }
}

const getIdResource = async (name: string) => {
    let resource = await Prisma.resource.findFirst({
        where: {
            name
        }
    });
    return resource.id_resource;
}

const seedActions = async () => {

    for(let action of actions) {

        //splitting the name by . and getting the resource name
        //then get the id_resource from the resource table
        console.log(action.name.split('.')[0]); 
        let id_resource = await getIdResource(action.name.split('.')[0]);
        

        await Prisma.action.create({
            data: {
                name: action.name,
                resources: {
                    connect: {
                        id_resource: id_resource.toString()
                    }
                }
            }
        })
    }
}

const seed = async () => {
    await seedResources().then(async () => {
        await seedActions();

    });

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