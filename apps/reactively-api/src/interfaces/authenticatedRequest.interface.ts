import { Request } from "express";

export interface AuthenticatedRequestInterface extends Request {
    user: {
        id_user: number;
        
    };

}

export interface AuthenticatedRequest extends AuthenticatedRequestInterface {}; 

