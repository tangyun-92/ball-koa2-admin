/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:50:33 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-08-23 13:33:01
 */
let MYSQL_CONF

MYSQL_CONF = {
  host: '172.16.11.25',
  // host: '192.168.2.29',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'ball',
}

BASE_CONFIG = {
  staticUrl: '172.16.11.229:8080' // 静态资源地址 -- 存放图片
}

module.exports = {
  MYSQL_CONF,
  BASE_CONFIG,
}
