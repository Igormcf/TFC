import TeamsModel from '../database/models/TeamsModel';
import ITeams from '../interfaces/teams.interface';
import IResult from '../interfaces/result.interface';

export default class TeamsService {
  public getAllTeams = async (): Promise<IResult> => {
    const allTeams: ITeams[] = await TeamsModel.findAll();

    return { statusCode: 200, result: allTeams };
  };

  public getTeamId = async (id: number): Promise<IResult> => {
    const team: ITeams | null = await TeamsModel.findByPk(id);

    return { statusCode: 200, result: team };
  };
}
