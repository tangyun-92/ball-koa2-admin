/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 09:29:40
 * 球队荣誉记录模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const TeamHonor = sequelize.define(
  'TeamHonors',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
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
    award_code: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: 't_team_honor',
    timestamps: false,
  }
)

module.exports = TeamHonor
