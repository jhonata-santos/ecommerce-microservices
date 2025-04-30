import { Router } from 'express';
import { ProductController } from '../controllers/product-controller';

const productController = new ProductController();
const productRouter = Router();

productRouter.post('/products', productController.create);
// productRouter.get('/products', productController.readAll);
// productRouter.get('/products/:id', productController.read);
// productRouter.put('/products/:id', productController.updateAll);
// productRouter.patch('/products/:id', productController.updatePartial);
// productRouter.delete('/products/:id', productController.delete);
// productRouter.delete('/products', productController.deleteAll);

export default productRouter;