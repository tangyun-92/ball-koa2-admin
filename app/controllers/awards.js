/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-22 16:28:50
 * 奖项管理
 */
const Award = require('../models/awards')
const { Op } = require('sequelize')
const { returnCtxBody, createTree } = require('../utils/index')

class AwardCtl {
  // 获取奖项列表
  async find(ctx) {
    const { count, rows } = await Award.findAndCountAll({
      order: ['id'],
    })
    ctx.body = returnCtxBody({
      data: {
        records: rows,
        total: count,
      },
    })
  }

  // 创建/更新奖项
  async update(ctx) {
    const { id, code } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        code: { type: 'string', require: false },
        name: { type: 'string', require: false },
        if_parent: { type: 'string', require: false },
        parent_code: { type: 'string', require: false },
      })
      const repeatedId = await Award.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '奖项不存在')
      }
      await Award.update(ctx.request.body, { where: { id } })
    } else {
      const haveCode = await Award.findOne({ where: { code } })
      if (haveCode) {
        ctx.throw(200, '类型代码已存在')
      }
      ctx.verifyParams({
        code: { type: 'string', require: true },
        name: { type: 'string', require: true },
        if_parent: { type: 'string', require: true },
        parent_code: { type: 'string', require: false },
      })
      await Award.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除奖项
  async delete(ctx) {
    const { id } = ctx.request.body
    await Award.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new AwardCtl()
