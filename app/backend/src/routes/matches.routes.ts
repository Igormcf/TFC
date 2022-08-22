import { Router } from 'express';
import MatchesCOntroller from '../controllers/matches.controller';
import validJWT from '../middlewares/validJWT';

const router = Router();
const matchesController = new MatchesCOntroller();

router.get('/matches', matchesController.getAllMatches);
router.post('/matches', validJWT, matchesController.createMatches);

export default router;
