import Router from 'express';
import deviceController from '../controller/deviceController.js';

const deviceRouter = new Router();

deviceRouter.post('/device', deviceController.create);
deviceRouter.get('/device', deviceController.getAll);
deviceRouter.get('/device/:id', deviceController.getOne);
deviceRouter.delete('/device/:id', deviceController.delete);

export default deviceRouter;
