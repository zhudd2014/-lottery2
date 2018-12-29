// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

/**
 * 获取抽奖结果
 */
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  //1）查询已设置好的Suc

  //2) 查询待抽奖的人

  //3）查询活动条件
  const db = wx.cloud.database()
  const result = ''
  // 查询当前用户所有的 counters
  db.collection('event_success').where({
    event_id: 'XCYin4nnuWjciuy7'
  }).get({
    success: res => {
      result = JSON.stringify(res.data, null, 2);
      console.log('[数据库event_success] [查询记录] 成功: ', res.data)
    },
    fail: err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
      console.error('[数据库] [查询记录] 失败：', err)
    }
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    result: result,
  }
}