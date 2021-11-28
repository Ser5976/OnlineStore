import Router from 'express';
import brandController from '../controller/brandController.js';

const brandRouter = new Router();

brandRouter.post('/brand', brandController.create);
brandRouter.get('/brand', brandController.getAll);
brandRouter.delete('/brand/:id', brandController.delete);

export default brandRouter;
