/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 10:38:42
 * 教练荣誉记录模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Team = require('./teams')

const CoachHonor = sequelize.define(
  'CoachHonors',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    coach_id: {
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
    award_code: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: 'c_coach_honor',
    timestamps: false,
  }
)

CoachHonor.belongsTo(Team, { foreignKey: 'team_id', targetKey: 'id', as: 't' }) // 如果对应 Team 关联的是主键则不用写 targetKey，否则需要 targetKey: id

module.exports = CoachHonor
