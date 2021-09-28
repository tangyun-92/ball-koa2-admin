/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 10:51:51
 * 教练执教经历模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Team = require('./teams')

const CoachExperience = sequelize.define(
  'CoachExperiences',
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
    duty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    end_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'c_coach_experience',
    timestamps: false,
  }
)

CoachExperience.belongsTo(Team, { foreignKey: 'team_id', targetKey: 'id', as: 't' }) // 如果对应 Team 关联的是主键则不用写 targetKey，否则需要 targetKey: id

module.exports = CoachExperience
