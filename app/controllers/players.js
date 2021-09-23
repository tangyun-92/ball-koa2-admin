/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 16:03:48
 * 球员管理
 */
const Player = require('../models/players')
const Team = require('../models/teams')
const Nation = require('../models/nations')
const { Op } = require('sequelize')
const { returnCtxBody, createTree, fileUpload } = require('../utils/index')
const sequelize = require('../models/db')
const Ability = require('../models/abilities')
const Position = require('../models/positions')
const PlayerData = require('../models/player-datas')
const PlayerHonor = require('../models/player-honors')
const PlayerTransfer = require('../models/player-transfer')
const PlayerInjury = require('../models/player-injury')

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

  // 获取球员能力值
  async findAbility(ctx) {
    const { id } = ctx.request.body
    const res = await Ability.findOne({ where: { player_id: id } })
    ctx.body = returnCtxBody({
      data: {
        records: res,
      },
    })
  }

  // 更新球员能力值
  async updateAbility(ctx) {
    const { player_id } = ctx.request.body
    const res = await Ability.findOne({ where: { player_id } })
    // player_id存在执行更新，不存在执行新增
    if (res) {
      await Ability.update(ctx.request.body, { where: { player_id } })
    } else {
      await Ability.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 获取球员位置
  async findPosition(ctx) {
    const { id } = ctx.request.body
    const res = await Position.findOne({ where: { player_id: id } })
    ctx.body = returnCtxBody({
      data: {
        records: res,
      },
    })
  }

  // 更新球员位置
  async updatePosition(ctx) {
    const { player_id } = ctx.request.body
    const res = await Position.findOne({ where: { player_id } })
    // player_id存在执行更新，不存在执行新增
    if (res) {
      await Position.update(ctx.request.body, { where: { player_id } })
    } else {
      await Position.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 获取球员历史数据
  async findPlayerData(ctx) {
    const { id } = ctx.request.body
    const res = await PlayerData.findAll({
      where: { player_id: id },
      order: [['time', 'DESC']],
    })
    ctx.body = returnCtxBody({
      data: {
        records: res,
      },
    })
  }

  // 新增/更新球员历史数据
  async updatePlayerData(ctx) {
    const { id } = ctx.request.body
    if (id) {
      await PlayerData.update(ctx.request.body, { where: { id } })
    } else {
      await PlayerData.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除球员历史数据
  async deletePlayerData(ctx) {
    const { id } = ctx.request.body
    await PlayerData.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }

  // 获取球员荣誉记录
  async findPlayerHonor(ctx) {
    const { id } = ctx.request.body
    const res = await PlayerHonor.findAll({
      where: {
        player_id: id,
      },
      order: [['time', 'DESC']],
      attributes: {
        include: [[sequelize.col('t.name'), 'team']],
      },
      include: [
        {
          model: Team,
          as: 't',
          attributes: [],
        },
      ],
    })
    ctx.body = returnCtxBody({
      data: {
        records: res,
      },
    })
  }

  // 新增/更新球员荣誉记录
  async updatePlayerHonor(ctx) {
    const { id } = ctx.request.body
    if (id) {
      await PlayerHonor.update(ctx.request.body, { where: { id } })
    } else {
      await PlayerHonor.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除球员荣誉记录
  async deletePlayerHonor(ctx) {
    const { id } = ctx.request.body
    await PlayerHonor.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }

  // 获取球员转会记录
  async findPlayerTransfer(ctx) {
    const { id } = ctx.request.body
    const res = await PlayerTransfer.findAll({
      where: {
        player_id: id,
      },
      order: [['time', 'DESC']],
      attributes: {
        include: [
          [sequelize.col('ot.name'), 'old_team'],
          [sequelize.col('nt.name'), 'new_team'],
        ],
      },
      include: [
        {
          model: Team,
          as: 'ot',
          attributes: [],
        },
        {
          model: Team,
          as: 'nt',
          attributes: [],
        },
      ],
    })
    ctx.body = returnCtxBody({
      data: {
        records: res,
      },
    })
  }

  // 新增/更新球员转会记录
  async updatePlayerTransfer(ctx) {
    const { id } = ctx.request.body
    if (id) {
      await PlayerTransfer.update(ctx.request.body, { where: { id } })
    } else {
      await PlayerTransfer.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除球员转会记录
  async deletePlayerTransfer(ctx) {
    const { id } = ctx.request.body
    await PlayerTransfer.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }

  // 获取球员伤病记录
  async findPlayerInjury(ctx) {
    const { id } = ctx.request.body
    const res = await PlayerInjury.findAll({
      where: {
        player_id: id,
      },
      order: [['end_time', 'DESC']],
      attributes: {
        include: [[sequelize.col('t.name'), 'team']],
      },
      include: [
        {
          model: Team,
          as: 't',
          attributes: [],
        },
      ],
    })
    ctx.body = returnCtxBody({
      data: {
        records: res,
      },
    })
  }

  // 新增/更新球员伤病记录
  async updatePlayerInjury(ctx) {
    const { id } = ctx.request.body
    if (id) {
      await PlayerInjury.update(ctx.request.body, { where: { id } })
    } else {
      await PlayerInjury.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除球员伤病记录
  async deletePlayerInjury(ctx) {
    const { id } = ctx.request.body
    await PlayerInjury.destroy({
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
