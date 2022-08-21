import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) {}

  public getAllTeams = async (req: Request, res: Response) => {
    const { statusCode, result } = await this.teamsService.getAllTeams();

    return res.status(statusCode).json(result);
  };

  public getTeamId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idTeam = Number(id);

    const { statusCode, result } = await this.teamsService.getTeamId(idTeam);

    return res.status(statusCode).json(result);
  };
}
