import { Router } from 'express';
import {
  getAllTias,
  getTiaById,
  postTia,
  putTia,
  deleteTia
} from '../controllers/tia_controllers.js';

const router = Router();

router.get('/', getAllTias);
router.get('/:id', getTiaById);
router.post('/', postTia);
router.put('/:id', putTia);
router.delete('/:id', deleteTia);

export default router;
