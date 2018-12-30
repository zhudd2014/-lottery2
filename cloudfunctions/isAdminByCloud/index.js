// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  
  console.log('event'+event)
  console.log(event.userInfo.openId)
  let isAdmin = false
  if (event.userInfo.openId === 'ovmWW5FHRmgEWUquGVNgiOMEdVV4') {
    isAdmin = true
  }
  if (event.userInfo.openId === 'ovmWW5Px9uqFJAXvD6nHBHM1tTHA') {
    isAdmin = true
  }
  return {
    isAdmin: isAdmin
  }
}