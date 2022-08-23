import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import { INewMatchesLeaderboard, ILeaderboard } from '../interfaces/matchesLeaderboard.interface';
import IResult from '../interfaces/result.interface';

export default class LeaderboardService {
  public getHomeTeamMatches = async (id: number) => {
    const findHomeTeam = await MatchesModel.findAll({ where: { homeTeam: id, inProgress: false } });

    return findHomeTeam;
  };

  public createLeaderboard = (matches: INewMatchesLeaderboard[]): ILeaderboard => {
    const totalGames = matches.length;
    const totalVictories = matches.filter((item) => item.homeTeamGoals > item.awayTeamGoals).length;
    const totalDraws = matches.filter((item) => item.homeTeamGoals === item.awayTeamGoals).length;
    const totalLosses = matches.filter((item) => item.homeTeamGoals < item.awayTeamGoals).length;
    const totalPoints = (totalVictories * 3) + totalDraws;
    const goalsFavor = matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

    return { totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency };
  };

  public getHomeMatches = async () => {
    const findAllTeams = await TeamsModel.findAll();
    const teamHomeLeaderboard = await Promise.all(findAllTeams.map(async ({ id, teamName }) => {
      const getAllMatches = await this.getHomeTeamMatches(id);
      const newLeaderboard = this.createLeaderboard(getAllMatches);

      return { name: teamName, ...newLeaderboard };
    }));

    return teamHomeLeaderboard;
  };

  public sortedMatches = (leaderboard: ILeaderboard[]): IResult => {
    const ordenedMatches = leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);

    return { statusCode: 200, result: ordenedMatches };
  };
}
