// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {

  const wxContext = cloud.getWXContext()

  const db = cloud.database();

  console.log('event.event_id' + event.event_id)
  //取中奖人的数据
  let updateZeroToOne = await db.collection('lotteries').where({
    event_id: event.event_id,
    status: 0
  }).update({
    data: {
      status: 1,
    },
    success(res) {
      return res;
    }
  })

  return {
    updateResult: updateZeroToOne
  }
}