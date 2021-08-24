/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:48 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-24 13:43:16
 * 用户模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const User = sequelize.define(
  'Users',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    tableName: 'sys_user',
    // timestamps: false,
    freezeTableName: true, // 是否不需要以s结尾
  }
)

// User.belongsTo(Role, { foreignKey: 'role_id', targetKey: 'id', as: 'rol' }) // 如果对应 Role 关联的是主键则不用写 targetKey，否则需要 targetKey: id
// User.belongsTo(Employee, { foreignKey: 'emp_id', targetKey: 'id', as: 'emp' })

module.exports = User