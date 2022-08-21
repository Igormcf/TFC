import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const router = Router();
const teamsController = new TeamsController();

router.get('/teams', teamsController.getAllTeams);
router.get('/teams/:id', teamsController.getTeamId);

export default router;
