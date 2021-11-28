import Router from 'express';
import authController from '../controller/authController.js';
import { check } from 'express-validator'; // для валидации реквеста
import { authMiddleware } from '../middleware/authMiddleware.js';
import { checkRoleMiddleware } from '../middleware/checkRoleMiddleware.js';

const authRouter = new Router();

authRouter.post(
  '/registration',
  [
    check('email', 'Некоректный email').isEmail(),
    check(
      'password',
      'Пороль должен быть больше 3 и меньше 8 символов'
    ).isLength({ min: 4, max: 8 }),
  ],
  authController.registration
);
authRouter.post('/login', authController.login);
authRouter.get('/check', authMiddleware, authController.checkToken);
authRouter.post('/basket', authMiddleware, authController.addBasket);
authRouter.delete('/basket/:id', authMiddleware, authController.deleteProduct);
authRouter.get('/basket', authMiddleware, authController.getBasket);
authRouter.get('/users', checkRoleMiddleware('ADMIN'), authController.getUsers);

export default authRouter;
