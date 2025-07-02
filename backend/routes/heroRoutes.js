// routes/heroRoutes.js
import express from 'express';
import uploadTemp from '../middleware/multer.js';
import { createHero, getAllHeroes, deleteHero } from '../controller/heroController.js';

const router = express.Router();

router.get('/', getAllHeroes);
router.post('/', uploadTemp.single('image'), createHero);
router.delete('/:id', deleteHero);

export default router;
