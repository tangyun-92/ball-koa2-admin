/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-28 10:53:23
 * 教练管理路由
 */
const Router = require('koa-router')
const router = new Router({ prefix: '/coachs' })
const jwt = require('koa-jwt')

const {
  find,
  update,
  delete: del,
  upload,
  findCoachHonor,
  updateCoachHonor,
  deleteCoachHonor,
  findCoachExperience,
  updateCoachExperience,
  deleteCoachExperience
} = require('../controllers/coachs')

const { secret } = require('../config/jwt')

/**
 * 认证中间件
 */
const auth = jwt({ secret }) // 生成的用户信息在ctx.state上

router.post('/list', auth, find)
router.post('/update', auth, update)
router.post('/delete', auth, del)
router.post('/upload', auth, upload)
router.post('/findCoachHonor', auth, findCoachHonor)
router.post('/updateCoachHonor', auth, updateCoachHonor)
router.post('/deleteCoachHonor', auth, deleteCoachHonor)
router.post('/findCoachExperience', auth, findCoachExperience)
router.post('/updateCoachExperience', auth, updateCoachExperience)
router.post('/deleteCoachExperience', auth, deleteCoachExperience)

module.exports = router
