import { Router } from 'express';
import MatchesCOntroller from '../controllers/matches.controller';
import validJWT from '../middlewares/validJWT';

const router = Router();
const matchesController = new MatchesCOntroller();

router.get('/matches', matchesController.getAllMatches);
router.post('/matches', validJWT, matchesController.createMatches);
router.patch('/matches/:id/finish', validJWT, matchesController.updateMatches);
router.patch('/matches/:id', validJWT, matchesController.updateGoalsMatches);

export default router;
