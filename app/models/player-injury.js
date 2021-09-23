/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 16:01:34
 * 球员伤病记录模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Team = require('./teams')

const PlayerInjury = sequelize.define(
  'PlayerInjurys',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    player_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    injury_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'p_player_injury',
    timestamps: false,
  }
)

PlayerInjury.belongsTo(Team, {
  foreignKey: 'team_id',
  targetKey: 'id',
  as: 't',
})

module.exports = PlayerInjury
