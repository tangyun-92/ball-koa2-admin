/*
 * @Author: 唐云
 * @Date: 2021-07-25 21:48:32
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 10:59:19
 * 教练管理
 */
const Coach = require('../models/coachs')
const Team = require('../models/teams')
const Nation = require('../models/nations')
const { Op } = require('sequelize')
const { returnCtxBody, fileUpload } = require('../utils/index')
const sequelize = require('../models/db')
const CoachHonor = require('../models/coach-honors')
const CoachExperience = require('../models/coach-experiences')

class CoachCtl {
  // 获取教练列表
  async find(ctx) {
    let {
      currentPage = 1,
      pageSize = 5,
      name = '',
      english_name = '',
      team_id = '',
      nation_id = '',
    } = ctx.request.body
    currentPage = Math.max(currentPage, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Coach.findAndCountAll({
      offset: (currentPage - 1) * pageSize,
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
        currentPage,
        pageSize,
        total: count,
      },
    })
  }

  // 创建/更新教练
  async update(ctx) {
    const { id } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        name: { type: 'string', require: false },
        english_name: { type: 'string', require: false },
      })
      const repeatedId = await Coach.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '教练不存在')
      }
      await Coach.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        name: { type: 'string', require: true },
        english_name: { type: 'string', require: true },
      })
      await Coach.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 教练头像上传
  async upload(ctx) {
    const url = fileUpload(ctx, 'coachs', false)
    ctx.body = {
      status: 200,
      result: true,
      message: '上传成功',
      url,
    }
  }

  // 删除教练
  async delete(ctx) {
    const { id } = ctx.request.body
    await CoachHonor.destroy({
      where: {
        coach_id: {
          [Op.or]: id,
        },
      },
    })
    await CoachExperience.destroy({
      where: {
        coach_id: {
          [Op.or]: id,
        },
      },
    })
    await Coach.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }

  // 获取教练荣誉记录
  async findCoachHonor(ctx) {
    const { id } = ctx.request.body
    const res = await CoachHonor.findAll({
      where: {
        coach_id: id,
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

  // 新增/更新教练荣誉记录
  async updateCoachHonor(ctx) {
    const { id } = ctx.request.body
    if (id) {
      await CoachHonor.update(ctx.request.body, { where: { id } })
    } else {
      await CoachHonor.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除教练荣誉记录
  async deleteCoachHonor(ctx) {
    const { id } = ctx.request.body
    await CoachHonor.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }

  // 获取教练执教经历
  async findCoachExperience(ctx) {
    const { id } = ctx.request.body
    const res = await CoachExperience.findAll({
      where: {
        coach_id: id,
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

  // 新增/更新教练执教经历
  async updateCoachExperience(ctx) {
    const { id } = ctx.request.body
    if (id) {
      await CoachExperience.update(ctx.request.body, { where: { id } })
    } else {
      await CoachExperience.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除教练执教经历
  async deleteCoachExperience(ctx) {
    const { id } = ctx.request.body
    await CoachExperience.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new CoachCtl()
