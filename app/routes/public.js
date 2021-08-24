/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-24 10:14:41
 * 公共路由
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/public' })
const jwt = require('koa-jwt')

const {
  findTeam,
  findNation
} = require('../controllers/public')

const { secret } = require('../config/jwt')

/**
 * 认证中间件
 */
const auth = jwt({ secret }) // 生成的用户信息在ctx.state上

router.post('/findTeam', auth, findTeam)
router.post('/findNation', auth, findNation)

module.exports = router
