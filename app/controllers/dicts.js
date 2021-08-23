/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-23 17:18:14
 * 字典管理
 */
const Dict = require('../models/dicts')
const { Op } = require('sequelize')
const { returnCtxBody, createTree } = require('../utils/index')

class DictCtl {
  // 获取字典列表
  async find(ctx) {
    const { count, rows } = await Dict.findAndCountAll({
      order: ['id'],
    })
    const data = createTree(rows, '0')
    ctx.body = returnCtxBody({
      data: {
        records: data,
        total: count,
      },
    })
  }

  // 创建/更新字典
  async update(ctx) {
    const { id, code } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        code: { type: 'string', require: false },
        name: { type: 'string', require: false },
        if_parent: { type: 'string', require: false },
        parent_code: { type: 'string', require: false },
      })
      const repeatedId = await Dict.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '字典不存在')
      }
      await Dict.update(ctx.request.body, { where: { id } })
    } else {
      const haveCode = await Dict.findOne({ where: { code } })
      if (haveCode) {
        ctx.throw(200, '类型代码已存在')
      }
      ctx.verifyParams({
        code: { type: 'string', require: true },
        name: { type: 'string', require: true },
        if_parent: { type: 'string', require: true },
        parent_code: { type: 'string', require: false },
      })
      await Dict.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除字典
  async delete(ctx) {
    const { id, code } = ctx.request.body
    // 如果删除的是字典类型，那么需要删除字典类型下所有的数据
    if (code) {
      const item = await Dict.findAll({ where: { parent_code: code } })
      item &&
        item.forEach((item) => {
          id.push(item.id)
        })
    }
    await Dict.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new DictCtl()
