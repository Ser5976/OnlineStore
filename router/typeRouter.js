import Router from 'express';
import typeController from '../controller/typeController.js';

const typeRouter = new Router();

typeRouter.post('/type', typeController.create);
typeRouter.get('/type', typeController.getAll);
typeRouter.get('/type/:id', typeController.getOne);
typeRouter.delete('/type/:id', typeController.delete);

export default typeRouter;
