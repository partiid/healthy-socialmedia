import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(
        AppModule
       
    );
    //app.useWebSocketAdapter(new RedisIoAdapter(app));

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            port: 3005, 

        }
    }); 

    await app.startAllMicroservices();
    await app.listen(3001);
}
bootstrap();
