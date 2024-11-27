import RideService from '../services/RideService';
import RideController from '../controllers/RideController';
import { Router } from 'express';
import RideModel from '../models/RideModel';
import prisma from '../libs/PrismaClient';

const router = Router();

const model = new RideModel(prisma);
const service = new RideService(model);
const controller = new RideController(service);

router.get('/:customer_id', controller.getMany.bind(controller));
router.post('/estimate', controller.estimate.bind(controller));
router.patch('/confirm', controller.create.bind(controller));

export default router;