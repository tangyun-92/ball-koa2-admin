/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-25 09:42:15
 * 能力模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Ability = sequelize.define(
  'Abilities',
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
    comprehensive: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    speed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shoot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dribbling: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    defend: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    power: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cross: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    heading: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    short_pass: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    volley: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    arc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    free_kick: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    long_pass: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ball_control: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    speed_up: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agility: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reaction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    balance: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shooting_power: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bounce: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stamina: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    strong: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    long_shot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aggressiveness: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    intercept_awareness: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    positioning: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    view: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    penalty_kick: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    marking: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    break_off: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    slide_tackle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    m_fish_dive: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    m_hand_shape: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    m_open_ball: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    m_stance: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    m_reaction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'p_player_ability',
    timestamps: false,
  }
)

module.exports = Ability
