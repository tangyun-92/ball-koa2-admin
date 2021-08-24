/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-24 15:00:52
 * 球员管理
 */
const Player = require('../models/players')
const Team = require('../models/teams')
const Nation = require('../models/nations')
const { Op } = require('sequelize')
const { returnCtxBody, createTree, fileUpload } = require('../utils/index')
const sequelize = require('../models/db')

class PlayerCtl {
  // 获取球员列表
  async find(ctx) {
    let {
      page = 1,
      pageSize = 5,
      name = '',
      english_name = '',
      team_id = '',
      nation_id = '',
      position = '',
    } = ctx.request.body
    page = Math.max(page, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Player.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      order: [['id', 'DESC']],
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
        english_name: {
          [Op.like]: `%${english_name}%`,
        },
        team_id: {
          [Op.like]: team_id ? `${team_id}` : `%${team_id}%`,
        },
        nation_id: {
          [Op.like]: nation_id ? `${nation_id}` : `%${nation_id}%`,
        },
        position: {
          [Op.like]: position ? `${position}` : `%${position}%`,
        },
      },
      attributes: {
        include: [
          [sequelize.col('t.name'), 'team'],
          [sequelize.col('n.name'), 'nation'],
        ],
      },
      include: [
        {
          model: Team,
          as: 't',
          attributes: [],
        },
        {
          model: Nation,
          as: 'n',
          attributes: [],
        },
      ],
    })
    ctx.body = returnCtxBody({
      data: {
        records: rows,
        page,
        pageSize,
        total: count,
      },
    })
  }

  // 创建/更新球员
  async update(ctx) {
    const { id } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        name: { type: 'string', require: false },
        english_name: { type: 'string', require: false },
        nation_id: { type: 'number', require: false },
        position: { type: 'string', require: false },
        feet: { type: 'string', require: false },
        inverse_enough: { type: 'string', require: false },
        fancy_tricks: { type: 'string', require: false },
        international_reputation: { type: 'string', require: false },
        price: { type: 'string', require: false },
      })
      const repeatedId = await Player.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '球员不存在')
      }
      await Player.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        name: { type: 'string', require: true },
        english_name: { type: 'string', require: true },
        nation_id: { type: 'number', require: true },
        position: { type: 'string', require: true },
        feet: { type: 'string', require: true },
        inverse_enough: { type: 'string', require: true },
        fancy_tricks: { type: 'string', require: true },
        international_reputation: { type: 'string', require: true },
        price: { type: 'string', require: true },
      })
      await Player.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 球员头像上传
  async upload(ctx) {
    const url = fileUpload(ctx, 'players', false)
    ctx.body = {
      status: 200,
      result: true,
      message: '上传成功',
      url,
    }
  }

  // 删除球员
  async delete(ctx) {
    const { id } = ctx.request.body
    await Player.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new PlayerCtl()
