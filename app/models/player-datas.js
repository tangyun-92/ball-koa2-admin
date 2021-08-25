/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-25 14:09:45
 * 球员数据模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const PlayerData = sequelize.define(
  'PlayerDatas',
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
    time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enter_field: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    starter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    game_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    goal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assist: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    averaging_goal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    every_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    be_foul: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shoot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    target_rate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    offside: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    key_pass: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pass_total: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pass_success: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    averaging_steal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    averaging_intercept: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    averaging_clearance: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    playing_time: {
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
    tableName: 'p_player_data',
    timestamps: false,
  }
)

module.exports = PlayerData
