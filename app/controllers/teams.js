/*
 * @Author: 唐云 
 * @Date: 2021-09-24 09:35:52 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-24 16:45:15
 * 球队管理
 */

const Team = require("../models/teams")
const TeamData = require('../models/team-datas')
const { Op } = require('sequelize')
const { returnCtxBody, fileUpload } = require('../utils/index')

class TeamCtl {
  // 获取球队列表
  async find(ctx) {
    let {
      currentPage = 1,
      pageSize = 5,
      name = '',
      english_name = '',
    } = ctx.request.body
    currentPage = Math.max(currentPage, 1)
    pageSize = Math.max(pageSize, 1)
    const { count, rows } = await Team.findAndCountAll({
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
      },
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

  // 创建/更新球队
  async update(ctx) {
    const { id } = ctx.request.body
    if (id) {
      ctx.verifyParams({
        name: { type: 'string', require: false },
        english_name: { type: 'string', require: false },
      })
      const repeatedId = await Team.findByPk(id)
      if (!repeatedId) {
        ctx.throw(200, '球队不存在')
      }
      await Team.update(ctx.request.body, { where: { id } })
    } else {
      ctx.verifyParams({
        name: { type: 'string', require: true },
        english_name: { type: 'string', require: true },
      })
      await Team.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 球队头像上传
  async upload(ctx) {
    const url = fileUpload(ctx, 'teams', false)
    ctx.body = {
      status: 200,
      result: true,
      message: '上传成功',
      url,
    }
  }

  // 删除球队
  async delete(ctx) {
    const { id } = ctx.request.body
    await Team.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }

  // 获取球队历史数据
  async findTeamData(ctx) {
    const { id } = ctx.request.body
    const res = await TeamData.findAll({
      where: { team_id: id },
      order: [['time', 'DESC']],
    })
    ctx.body = returnCtxBody({
      data: {
        records: res,
      },
    })
  }

  // 新增/更新球队历史数据
  async updateTeamData(ctx) {
    const { id } = ctx.request.body
    if (id) {
      await TeamData.update(ctx.request.body, { where: { id } })
    } else {
      await TeamData.create(ctx.request.body)
    }
    ctx.body = returnCtxBody({})
  }

  // 删除球队历史数据
  async deleteTeamData(ctx) {
    const { id } = ctx.request.body
    await TeamData.destroy({
      where: {
        id: {
          [Op.or]: id,
        },
      },
    })
    ctx.body = returnCtxBody({})
  }
}

module.exports = new TeamCtl()