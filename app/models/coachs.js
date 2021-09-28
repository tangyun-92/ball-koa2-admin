/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 09:46:41
 * 教练模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Team = require('./teams')
const Nation = require('./nations')

const Coach = sequelize.define(
  'Coachs',
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
    // 合同到期
    contract_expire: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: 'c_coach',
    timestamps: false,
  }
)

Coach.belongsTo(Team, { foreignKey: 'team_id', targetKey: 'id', as: 't' }) // 如果对应 Team 关联的是主键则不用写 targetKey，否则需要 targetKey: id
Coach.belongsTo(Nation, { foreignKey: 'nation_id', targetKey: 'id', as: 'n' }) // 如果对应 Nation 关联的是主键则不用写 targetKey，否则需要 targetKey: id


module.exports = Coach
