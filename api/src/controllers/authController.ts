import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {
    async authenticate(request: Request, response: Response) {
        const { email, password } = request.body;
        console.log(request.body);
        
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email }
        });

        if (!user) {
            return response.sendStatus(401)
        }

        const isValidatPassword = await bcryptjs.compare(password, user.password)

        if (!isValidatPassword) {
            return response.sendStatus(401)
        }
        const secretKey = process.env.PUBLIC_KEY as string;

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1d' });

        return response.json({ user, token });
    }

    async requestRedefinePassword(request: Request, response: Response) {
        
        const { email } = request.body;

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { email }
        });

        if (!user) {
            return response.sendStatus(401)
        }
        const secretKey = process.env.PUBLIC_KEY as string;

        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: 600 });

        console.log('Url sended email: n/', ` http://192.168.31.208:3000/redefine/password/${token}`);
        //Enviar link de refinir senha por email
        

        return response.sendStatus(202);
    }
}

export default new AuthController;