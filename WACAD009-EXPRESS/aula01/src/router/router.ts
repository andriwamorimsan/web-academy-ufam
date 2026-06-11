import { Router } from 'express';
import mainController from '../controllers/main.js';
import productController from '../controllers/product.js';

const router = Router();

router.get('/', mainController.index);
router.get('/sobre', mainController.sobre);
router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/lorem', mainController.lorem);
router.get('/lorem/:paragraphs', mainController.lorem);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

router.get('/product', productController.index);
router.all('/product/create', productController.create);
router.all('/product/update/:id', productController.update);
router.get('/product/:id', productController.read);
router.post('/product/:id', productController.remove);

router.use((req, res) => {
  res.status(404).render('main/404', {
    title: 'Pagina nao encontrada',
  });
});

export default router;
