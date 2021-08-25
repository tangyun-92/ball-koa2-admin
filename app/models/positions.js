/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-25 11:20:04
 * 能力模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Position = sequelize.define(
  'Positions',
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
    CF: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LW: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RW: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LM: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RM: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SF: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AMF: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CMF: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DM: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    WL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    WR: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LB: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    RB: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CB: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GK: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: 'p_player_position',
    timestamps: false,
  }
)

module.exports = Position
