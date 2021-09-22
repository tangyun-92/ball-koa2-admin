/*
 * @Author: 唐云 
 * @Date: 2021-07-25 21:50:33 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-09-22 09:32:26
 */
let MYSQL_CONF

MYSQL_CONF = {
  host: 'localhost',
  // host: '172.16.10.75',
  user: 'root',
  password: '12345678',
  port: '3306',
  database: 'ball',
}

BASE_CONFIG = {
  // staticUrl: '172.16.11.229:8080' // 静态资源地址 -- 存放图片
}

module.exports = {
  MYSQL_CONF,
  BASE_CONFIG,
}
