/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-24 17:31:05
 * 字典模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Dict = sequelize.define(
  'Dicts',
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
    parent_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    if_parent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sort: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'sys_code_info',
    timestamps: false,
  }
)

module.exports = Dict
