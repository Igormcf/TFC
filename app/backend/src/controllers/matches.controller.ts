import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress !== undefined) {
      const { statusCode, result } = await this.matchesService
        .queryAllMatches(inProgress === 'true');

      return res.status(statusCode).json(result);
    }

    const { statusCode, result } = await this.matchesService.getAllMatches();

    return res.status(statusCode).json(result);
  };

  public createMatches = async (req: Request, res: Response) => {
    const { statusCode, result } = await this.matchesService.createMatches(req.body);

    return res.status(statusCode).json(result);
  };

  public updateMatches = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idTeam = Number(id);

    const { statusCode, result } = await this.matchesService.updateMatches(idTeam);

    return res.status(statusCode).json(result);
  };

  public updateGoalsMatches = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { statusCode, result } = await this.matchesService
      .updateGoalsMatches({ id, homeTeamGoals, awayTeamGoals });

    return res.status(statusCode).json(result);
  };
}
