import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CryptoService } from 'src/shared/services/crypto.service';
@Injectable()
export class AuthService {
    constructor(
        private JwtService: JwtService,
        private UserService: UserService,
        private CryptoService: CryptoService) { }

    async validateUser(username: string, password: string): Promise<any> {

        const user = await this.UserService.findOne({username});
        
        
        if (user && await this.CryptoService.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        
        const payload = { username: user.username, sub: user.id, id_user: user.id_user };
        return {
            access_token: this.JwtService.sign(payload),
        };
    }

}
