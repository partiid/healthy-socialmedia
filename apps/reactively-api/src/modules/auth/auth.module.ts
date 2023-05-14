import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './strategy/local.strategy';
import { SessionSerializer } from './session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '../user/user.module';
import { CryptoService } from '../../shared/services/crypto.service';

@Global()
@Module({
    imports: [
        PassportModule.register({ session: true }),
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        SessionSerializer,
        JwtStrategy,
        CryptoService,
    ],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
