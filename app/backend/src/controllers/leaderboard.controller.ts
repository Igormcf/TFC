import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  public getHomeMatches = async (req: Request, res: Response) => {
    const getTeamHome = await this.leaderboardService.getHomeMatches();
    const { statusCode, result } = this.leaderboardService.sortedMatches(getTeamHome);

    return res.status(statusCode).json(result);
  };
}
