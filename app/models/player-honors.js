/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 11:00:34
 * 球员荣誉记录模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Team = require('../models/teams')

const PlayerHonor = sequelize.define(
  'PlayerHonors',
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
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    if_personal: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    award_code: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: 'p_player_honor',
    timestamps: false,
  }
)

PlayerHonor.belongsTo(Team, { foreignKey: 'team_id', targetKey: 'id', as: 't' }) // 如果对应 Team 关联的是主键则不用写 targetKey，否则需要 targetKey: id

module.exports = PlayerHonor
