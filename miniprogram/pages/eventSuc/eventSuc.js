// miniprogram/pages/eventSuc/eventSuc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    event_suc: [],
    event_suc_counts:0,
    isAdmin:false,
    event_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */

  //TODO 中奖名单改为云函数较好一点
  onLoad: function(options) {
    console.log('[SucEnvPage]options: ' + options)
    this.setData({
      event_id: options.event_id
    })
    console.log('[SucEnvPage]options: ' + this.data.event_id)
    
    wx.cloud.callFunction({
      name: 'getEventSuc',
      data: {
        event_id: this.data.event_id,
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  //随机设置一位抽奖者
  addRandomOne: function () {

    wx.cloud.callFunction({
      name: 'addRandomOne',
      data: {
        event_id:this.data.event_id
      },
      success: res => {
        this.setData({
          result: res,
        })
        this.onLoad({ event_id: this.data.event_id})
        console.log('[云函数addRandomOne调用] 成功: ', res)

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [addRandomOne] 调用失败：', err)
      }
    })
  },

  //随机设置一位抽奖者
  confirm: function () {

    wx.cloud.callFunction({
      name: 'confirm',
      data: {
        event_id:this.data.event_id
      },
      success: res => {
        this.setData({
          result: res,
        })
        this.onLoad()
        console.log('[云函数confirm调用] 成功: ', res)

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [confirm] 调用失败：', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  testwinprize: function () {
    wx.cloud.callFunction({
      name: 'winAPrize',
      data: {
        
      },
      success: res => {
        this.setData({
          result: res,
        })
        this.onLoad()
        console.log('[云函数winAPrize调用] 成功: ', res)

      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [winAPrize] 调用失败：', err)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})