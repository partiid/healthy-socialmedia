import { Module, NestModule, MiddlewareConsumer, CacheModule, CacheInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppService } from './app.service';
import type { ClientOpts } from 'redis';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import { PostModule } from './modules/post/post.module';
import { PostTagModule } from './modules/post-tag/post-tag.module';
import { TagModule } from './modules/tag/tag.module';
@Module({
    imports: [ AuthModule, UserModule, PostModule, PostTagModule, TagModule,
        CacheModule.register<ClientOpts>({
            store: redisStore,
            host: 'localhost',
            port: 6379,
            ttl: 3600
        }),
        DevtoolsModule.register({
            http: true
        })
    ],
    controllers: [AppController],
    providers: [AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },


    ],

})
export class AppModule {
  
}
