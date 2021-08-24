/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-24 10:13:05
 * 国家模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Nation = sequelize.define(
  'Nations',
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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'sys_nation',
    timestamps: false,
  }
)

module.exports = Nation
