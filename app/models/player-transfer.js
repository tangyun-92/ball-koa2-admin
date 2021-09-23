/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:49:05
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 15:00:16
 * 球员转会记录模型
 */
const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Team = require('./teams')

const PlayerTransfer = sequelize.define(
  'PlayerTransfers',
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
    old_team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    new_team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transfer_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'p_player_transfer_record',
    timestamps: false,
  }
)

PlayerTransfer.belongsTo(Team, {
  foreignKey: 'old_team_id',
  targetKey: 'id',
  as: 'ot',
}) // 如果对应 Team 关联的是主键则不用写 targetKey，否则需要 targetKey: id
PlayerTransfer.belongsTo(Team, {
  foreignKey: 'new_team_id',
  targetKey: 'id',
  as: 'nt',
})

module.exports = PlayerTransfer
