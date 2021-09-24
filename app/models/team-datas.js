/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-24 10:52:52
 * 球队数据模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const TeamData = sequelize.define(
  'TeamDatas',
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
    ranking: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    win: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deuce: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lose: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    integral: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    goal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    penalty_kick: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    averaging_shot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    averaging_respectively: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    averaging_pass: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pass_success: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    key_pass: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fumble: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    steal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    intercept: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clearance: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    foul: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yellow_card: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    red_card: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: 't_team_data',
    timestamps: false,
  }
)

module.exports = TeamData
