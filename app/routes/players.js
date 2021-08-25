/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-25 10:39:30
 * 球员路由
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/players' })
const jwt = require('koa-jwt')

const {
  find,
  update,
  delete: del,
  upload,
  findAbility,
  updateAbility,
} = require('../controllers/players')

const { secret } = require('../config/jwt')

/**
 * 认证中间件
 */
const auth = jwt({ secret }) // 生成的用户信息在ctx.state上

router.post('/list', auth, find)
router.post('/update', auth, update)
router.post('/delete', auth, del)
router.post('/upload', auth, upload)
router.post('/findAbility', auth, findAbility)
router.post('/updateAbility', auth, updateAbility)

module.exports = router
