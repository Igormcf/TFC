import MatchesModel from '../database/models/MatchesModel';
import IResult from '../interfaces/result.interface';
import Teams from '../database/models/TeamsModel';
import INewMatches from '../interfaces/newMatches.interface';

export default class MatchesService {
  public getAllMatches = async (): Promise<IResult> => {
    const allMatches = await MatchesModel.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return { statusCode: 200, result: allMatches };
  };

  public queryAllMatches = async (q: boolean): Promise<IResult> => {
    const allQueryMatches = await MatchesModel.findAll({
      where: { inProgress: q },
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return { statusCode: 200, result: allQueryMatches };
  };

  public createMatches = async ({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals }: INewMatches): Promise<IResult> => {
    const newMatches = await MatchesModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

    return { statusCode: 201, result: newMatches };
  };
}
