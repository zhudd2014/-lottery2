// miniprogram/pages/prize/prize.js
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageStyle: "border-radius: 4px 4px 0px 0px;width: 100%; height: " + app.globalData.windowWidth / 2 + "px;",
    prize: {},
    userInfo: app.globalData.userInfo,
    isParticipated: false,
    joinUserCount:0,
    joinUsers:10,
    status:0,//抽奖状态 0-参与中 1-待开奖 2-已开奖
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let prize = JSON.parse(options.prize);
    this.setData({
      prize: prize
    })


    const db = wx.cloud.database()
    /**
     * 此查询判断不准确
     */
    // 查询当前用户有无参加
    db.collection('event_joins').where({
      _openid: this.data.openid,
      event_id: 'XCYin4nnuWjciuy7',
    }).get({
      success: res => {
        if (res.data.length > 0) {
          this.setData({
            isParticipated: false
          })
        }
        console.log('[数据库event_joins] [查询当前用户有无参加] 成功: ', res.data.length)

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

    // 查询参加总数
    db.collection('event_joins').where({
      event_id: 'XCYin4nnuWjciuy7'
    }).get({
      success: res => {
        if (res.data.length > 0) {
          this.setData({
            joinUserCount: res.data.length
          })
        }
        console.log('[数据库event_joins] [查询总用户数] 成功: ', res.data.length)

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },


  /**
   * 登记报名时，openid字段对不上，查询页查询不到
   */
  joinGame: function() {

    if (this.data.isParticipated) {
      return
    }

    const updateNum = this.data.joinUserCount + 1;
    const db = wx.cloud.database()
    db.collection('event_joins').add({
      data: {
        event_id: 'XCYin4nnuWjciuy7',
        touxiang_pic: app.globalData.userInfo.avatarUrl,
        nick_name: app.globalData.userInfo.nickName,
        level:0
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          isParticipated: true,
          joinUserCount: updateNum
        })

        wx.showToast({
          title: '报名成功',
        })
        console.log('[数据库event_joins] [新增记录] 成功，记录 _id: ', open_id)


      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '报名成功，请勿重新报名'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  //随机设置一位抽奖者
  addRandomOne: function() {

    const db = wx.cloud.database();

    db.collection('event_joins').where({
      event_id: 'XCYin4nnuWjciuy7',
      level: 0
    }).get({
      success: res => {
        const length = res.data.length;

        //随机一个 更新为中奖
        const random = Math.floor(Math.random() * (length + 1));
        console.log('[数据库event_joins] [查询未中奖人] 成功，人数: ', length)
        console.log('[数据库event_joins] [生成随机数] 成功，设置中将人: ', random)

        const updateId = res.data[random]._id;
        //取中奖人的数据
        console.log('[数据库event_joins] [生成随机数] 成功，中奖人id ', updateId)
        
        db.collection('event_joins').doc(updateId).update({

          data: {
            level: 1,
          },
          success(res) {
            console.log(res)
          }
        })

      }

    });
  },


  goToUsers: function() {
    wx.navigateTo({
      url: '../users/users'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})