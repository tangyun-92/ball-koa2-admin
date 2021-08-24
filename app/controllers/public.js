/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-24 10:14:26
 * 公共接口
 */
const Team = require('../models/teams')
const Nation = require('../models/nations')
const { Op } = require('sequelize')
const { returnCtxBody } = require('../utils/index')

class PublicCtl {
  // 获取球队列表
  async findTeam(ctx) {
    const res = await Team.findAll({
      order: ['id'],
      attributes: ['id', 'name']
    })
    ctx.body = returnCtxBody({
      data: {
        records: res,
      },
    })
  }

  // 获取国家列表
  async findNation(ctx) {
    const res = await Nation.findAll({
      order: ['id'],
      attributes: ['id', 'name'],
    })
    ctx.body = returnCtxBody({
      data: {
        records: res,
      },
    })
  }
}

module.exports = new PublicCtl()
