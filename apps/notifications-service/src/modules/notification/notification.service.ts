import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ServiceInterface } from 'apps/reactively-api/src/interfaces/service.interface';
import { PrismaService } from 'apps/reactively-api/src/prisma.service';
@Injectable()
export class NotificationService {

    constructor(private readonly PrismaService: PrismaService) {} 

    


}
