import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from 'apps/reactively-api/src/modules/post/post.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'apps/reactively-api/src/modules/auth/auth.module';
import { UserModule } from 'apps/reactively-api/src/modules/user/user.module';
import { HandlerService } from './handler/handler.service';
import { NotificationModule } from './modules/notification/notification.module';
import { PrismaService } from './prisma.service';
import { ActionService } from './action/action.service';



@Module({
    imports: [PostModule, AuthModule, UserModule, NotificationModule],
    controllers: [AppController],
    providers: [AppService, HandlerService, PrismaService, ActionService],
})
export class AppModule {}
