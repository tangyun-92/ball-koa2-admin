/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-22 16:32:31
 * 奖项模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Award = sequelize.define(
  'Awards',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    if_personal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'sys_code_awards',
    timestamps: false,
  }
)

module.exports = Award
