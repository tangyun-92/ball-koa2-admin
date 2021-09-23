/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-22 16:25:25
 * 奖项路由
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/awards' })
const jwt = require('koa-jwt')

const {
  find,
  update,
  delete: del
} = require('../controllers/awards')

const { secret } = require('../config/jwt')

/**
 * 认证中间件
 */
const auth = jwt({ secret }) // 生成的用户信息在ctx.state上

router.post('/list', auth, find)
router.post('/update', auth, update)
router.post('/delete', auth, del)

module.exports = router
