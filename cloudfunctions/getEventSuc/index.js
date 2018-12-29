// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

/**
 * 获取抽奖结果
 */
// 云函数入口函数
exports.main = async (event, context) => {

  console.log(event)
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const result = ''
  // 查询当前用户所有的 counters
  db.collection('event_success').where({
    event_id: 'XCYin4nnuWjciuy7'
  }).get({
    success: res => {
      result = JSON.stringify(res, null, 2);
    
      return {
        getEventSucResult: 'abc',
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
      }
    },
    fail: err => {
      return {
        getEventSucResult: 'def',
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
      }
    }
  });

  return {
    getEventSucResult: 'xxx',
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }

}