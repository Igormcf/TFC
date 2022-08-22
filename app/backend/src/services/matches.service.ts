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

  public findTeams = async (id: number) => Teams.findOne({ where: { id } });

  public createMatches = async ({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals }: INewMatches): Promise<IResult> => {
    const findTeamHome = await this.findTeams(homeTeam);
    const findTeamAway = await this.findTeams(awayTeam);

    if (findTeamHome === null || findTeamAway === null) {
      return { statusCode: 404,
        result: { message: 'There is no team with such id!' } };
    }

    if (homeTeam === awayTeam) {
      return { statusCode: 401,
        result: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const newMatches = await MatchesModel
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

    return { statusCode: 201, result: newMatches };
  };

  public updateMatches = async (id: number): Promise<IResult> => {
    await MatchesModel.update({ inProgress: false }, { where: { id } });

    return { statusCode: 200, result: { message: 'Finished' } };
  };
}
