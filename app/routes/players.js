/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:48:41 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-23 13:13:22
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
  findPosition,
  updatePosition,
  findPlayerData,
  updatePlayerData,
  deletePlayerData,
  findPlayerHonor,
  updatePlayerHonor,
  deletePlayerHonor,
  findPlayerTransfer,
  updatePlayerTransfer,
  deletePlayerTransfer,
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
router.post('/findPosition', auth, findPosition)
router.post('/updatePosition', auth, updatePosition)
router.post('/findPlayerData', auth, findPlayerData)
router.post('/updatePlayerData', auth, updatePlayerData)
router.post('/deletePlayerData', auth, deletePlayerData)
router.post('/findPlayerHonor', auth, findPlayerHonor)
router.post('/updatePlayerHonor', auth, updatePlayerHonor)
router.post('/deletePlayerHonor', auth, deletePlayerHonor)
router.post('/findPlayerTransfer', auth, findPlayerTransfer)
router.post('/updatePlayerTransfer', auth, updatePlayerTransfer)
router.post('/deletePlayerTransfer', auth, deletePlayerTransfer)

module.exports = router
