import express from 'express';
import { getAllLists, createList, getListById } from '../controllers/listController.js';

const router = express.Router();

router.get('/', getAllLists);
router.post('/', createList);
router.get('/:id', getListById);

export default router;


