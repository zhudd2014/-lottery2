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
    userInfo: null,
    isParticipated: false,
    joinUserCount: 0,
    joinUsers: [],
    event_suc: [],
    event_suc_counts: 0,
    status: 0, //抽奖状态 0-参与中 1-待开奖 2-已开奖
    isAdmin: false,
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync('userInfo')) {
      let userInfo = JSON.parse(wx.getStorageSync('userInfo'));
      this.setData({
        userInfo: userInfo
      })
    }
    if (wx.getStorageSync('openid')) {
      let openid = wx.getStorageSync('openid');
      this.setData({
        openid: openid,
      })
    }

    console.log('####openId: ', this.data.openid)
    let prize = JSON.parse(options.prize);
    this.setData({
      prize: prize,
      status: prize.status
    })


    const db = wx.cloud.database()
    /**
     * TODO 此查询判断不准确
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
    wx.cloud.callFunction({
      name: 'getEventJoins',
      data: {
        event_id: 'XCYin4nnuWjciuy7',
      },
      success: res => {
        console.log('[云函数getEventJoins调用] 成功: ', res.result)
        this.setData({
          joinUserCount: res.result.event_joins_counts
        })
        console.log('[云函数getEventJoins调用] 成功: ', res.result.event_joins.length)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [getEventJoins] 调用失败：', err)
      }
    })
    

    //查询最近七个头像
    db.collection('event_joins').where({
      event_id: 'XCYin4nnuWjciuy7'
    }).orderBy('join_time', 'desc').limit(7).get({
      success: res => {
        if (res.data.length > 0) {
          this.setData({
            joinUsers: res.data
          })
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

    wx.cloud.callFunction({
      name: 'getEventSuc',
      data: {
        event_id: 'XCYin4nnuWjciuy7',
      },
      success: res => {
        this.setData({
          event_suc: res.result.getEventSucResult.data,
          event_suc_counts: res.result.getEventSucResult.data.length
        })
        console.log('[云函数getEventSuc调用] 成功: ', res.result.getEventSucResult.data)

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [getEventSuc] 调用失败：', err)
      }
    })


    wx.cloud.callFunction({
      name: 'isAdminByCloud',
      data: {
        openid: this.data.openid,
      },
      success: res => {
        this.setData({
          isAdmin: res.result.isAdmin,
        })
        console.log('[云函数getAdminOpenId调用] 成功: ', res.result.isAdmin)

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [getAdminOpenId] 调用失败：', err)
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
        touxiang_pic: this.data.userInfo.avatarUrl,
        nick_name: this.data.userInfo.nickName,
        level: 0,
        join_time: new Date()
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

  goToUsers: function() {
    wx.navigateTo({
      url: '../users/users'
    })
  },
  done: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})