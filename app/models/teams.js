/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-24 09:48:18
 * 球队模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Player = sequelize.define(
  'Players',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    english_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    setup_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 所在地区
    area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 城市
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 球队主场
    home_court: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 容纳人数
    person_num: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 世界排名
    world_ranking: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 总身价
    total_value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 't_team',
    timestamps: false,
  }
)

module.exports = Player
