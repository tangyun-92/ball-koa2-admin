/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 10:56:32
 * 球员模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Team = require('../models/teams')
const Nation = require('./nations')

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
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    team_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    nation_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    // 球衣号码
    uniform_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 身高
    high: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 体重
    weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 生日
    birthday: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 位置
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 惯用脚
    feet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 逆足能力
    inverse_enough: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 花式技巧
    fancy_tricks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 国际声望
    international_reputation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 身价
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 合同到期
    contract_expire: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // 技术特点
    technical_feature: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    // 强项
    strong_point: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    // 弱项
    weak_point: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: 'p_player',
    timestamps: false,
  }
)

Player.belongsTo(Team, { foreignKey: 'team_id', targetKey: 'id', as: 't' }) // 如果对应 Team 关联的是主键则不用写 targetKey，否则需要 targetKey: id
Player.belongsTo(Nation, { foreignKey: 'nation_id', targetKey: 'id', as: 'n' }) // 如果对应 Nation 关联的是主键则不用写 targetKey，否则需要 targetKey: id


module.exports = Player
