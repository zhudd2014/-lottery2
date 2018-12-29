// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  const event_id = event.event_id;
  console.log('[云函数confirm] event_id: ', event_id)
  const db = cloud.database();

  //取中奖人的数据
  //TODO 此处写死
  let confirm = await db.collection('lotteries').doc('XCbPzlsqTi00tk_5').update({
    data: {
      status: 2,
    },
    success(res) {
      return res;
    }
  })



  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}