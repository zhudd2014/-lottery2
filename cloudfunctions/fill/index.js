// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  let result = false
  let res_info = ''

  //查询中奖人
  let getEventSucResult = await db.collection('event_joins').where({
    event_id: event.event_id,
    level: _.gt(0)
  }).orderBy('level', 'desc').get({
    success: res => {
      result = res;
      return result;
    }
  });

  let suc_count = getEventSucResult.data.length;
  console.log(suc_count)

  //查询未中奖人
  let getFailResult = await db.collection('event_joins').where({
    event_id: event.event_id,
    level: 0
  }).orderBy('level', 'desc').limit(100).get({
    success: res => {
      return res;
    }
  });

  let fail_count = getFailResult.data.length;
  console.log(fail_count)

  //查询prize_num
  let prize = await db.collection('lotteries').where({
    event_id: event.event_id,
  }).get({
    success: res => {
      return res;
    }
  });

  let prize_num = prize.data[0].prize_num;
  console.log(prize_num)

  let to_set_num = prize_num - suc_count;
  console.log('######to_set_num')
  console.log(to_set_num)

  if (to_set_num > fail_count) {
    res_info = '人数不够，不能设置'
  } else {
    //调用云函数设置剩余抽奖人
    for (; to_set_num > 0; to_set_num--) {
      let add = await cloud.callFunction({
        name: 'addRandomOne',
        data: {},
        success: res => {},
        fail: err => {}
      })
    }
    let result = true
    let res_info = 'ok'
  }


  return {
    result: result,
    res_info: res_info
  }
}