// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  console.log(event)
  console.log(event.userInfo.openId)
  const isAdmin = false
  if (event.userInfo.openId == 'ovmWW5FHRmgEWUquGVNgiOMEdVV4') {
    isAdmin = true
  }

  return {
    isAdmin: isAdmin
  }
}