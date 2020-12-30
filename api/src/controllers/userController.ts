import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

class UserController {
    async create(request: Request, response: Response) {
        const { email, password, name} = request.body;

        const userRepository = getRepository(User);

        const userExists = await userRepository.findOne({
            where: {email}
        });

        if(userExists) {
            return response.sendStatus(409);
        }

        const user = userRepository.create({email, password, name})
        await userRepository.save(user);

        return response.json(user)
    }

    async index(request: Request, response: Response) {
        const {userId} = request;
        return response.json({userId})
    }

    async update(request: Request, response: Response) {
        const { email, password } = request.body;
        const {id} = request.params;

        const userRepository = getRepository(User);

        console.log({email, password, id});
        
        try {
            await userRepository.findOneOrFail({where:{email, id}})
            const userUpdate = userRepository.create({ password})
            userRepository.update({id}, userUpdate)
            return response.sendStatus(204)
        } catch  {
            console.log('Usuario não existe, não foi possível atualzar');
            
            return response.sendStatus(409);
            
        }
    }
}

export default new UserController;