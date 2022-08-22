import MatchesModel from '../database/models/MatchesModel';
import IResult from '../interfaces/result.interface';
import Teams from '../database/models/TeamsModel';

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
}
