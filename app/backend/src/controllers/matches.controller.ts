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
}
