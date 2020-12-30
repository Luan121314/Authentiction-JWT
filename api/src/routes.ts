import { Router } from 'express';
import userController from './controllers/userController';
import authController from './controllers/authController';
import authMiddleware from './middlewares/authMiddleware';

const routes = Router();

routes.post('/users', authMiddleware, userController.create);
routes.put('/users/:id', authMiddleware, userController.update);
routes.get('/users', authMiddleware, userController.index);
routes.post('/auth', authController.authenticate);
routes.post('/auth/redefine/password', authMiddleware, authController.requestRedefinePassword);

export default routes;