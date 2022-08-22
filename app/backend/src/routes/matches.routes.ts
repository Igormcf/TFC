import { Router } from 'express';
import MatchesCOntroller from '../controllers/matches.controller';

const router = Router();
const matchesController = new MatchesCOntroller();

router.get('/matches', matchesController.getAllMatches);

export default router;
