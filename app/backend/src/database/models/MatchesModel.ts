import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: INTEGER,
    field: 'home_team',
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    field: 'home_team_goals',
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    field: 'away_team',
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    field: 'away_team_goals',
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    field: 'in_progress',
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.hasMany(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.hasMany(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.belongsTo(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.belongsTo(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
