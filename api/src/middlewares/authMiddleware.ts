import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload{
    id: string
}

export default function authMiddleware(
    request: Request, response: Response, next: NextFunction
){
    const {authorization} = request.headers;
    console.log(request.headers.authorization);
    
    if(!authorization){
        return response.sendStatus(401)
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const secretKey = process.env.PUBLIC_KEY as string;

        const data  = jwt.verify(token, secretKey);
        
        const {id} = data as TokenPayload;
        request.userId = id

        return next();
        
    } catch  {
        console.log('Error in middleware authenticate');
        
        return response.sendStatus(401)
        
    }
}