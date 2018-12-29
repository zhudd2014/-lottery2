// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {

  const wxContext = cloud.getWXContext()

  const db = cloud.database();

  let updateId = await db.collection('event_joins').where({
    event_id: 'XCYin4nnuWjciuy7',
    level: 0
  }).get({
    success: res => {
      const length = res.data.length;

      //随机一个 更新为中奖
      const random = Math.floor(Math.random() * (length + 1));
      console.log('[数据库event_joins] [查询未中奖人] 成功，人数: ', length)
      console.log('[数据库event_joins] [生成随机数] 成功，设置中将人: ', random)
      return res.data[random]._id;
    }
  });

  console.log('[数据库event_joins] [生成随机数] 成功，中奖人id ', updateId)
  //取中奖人的数据
  let updateResult = await db.collection('event_joins').doc(updateId).update({
    data: {
      level: 1,
    },
    success(res) {
      console.log(res)
      return res;
    }
  })

  return {
    updateResult: updateResult
  }
}