import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class CryptoService {

    constructor() {} 

     #getSalt(): number {
        return 10;
    }

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.#getSalt());
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }



}