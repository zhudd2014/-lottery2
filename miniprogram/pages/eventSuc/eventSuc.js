// miniprogram/pages/eventSuc/eventSuc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    event_suc: '',
    event_suc_counts:0
  },

  /**
   * 生命周期函数--监听页面加载
   */

  //TODO 中奖名单改为云函数较好一点
  onLoad: function(options) {
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
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function(options) {
  //   const db = wx.cloud.database()
  //   // 查询当前用户所有的 counters
  //   db.collection('event_success').where({
  //     event_id: 'XCYin4nnuWjciuy7'
  //   }).get({
  //     success: res => {
  //       this.setData({
  //         event_suc: JSON.stringify(res.data, null, 2),
  //       })
  //       console.log('[数据库event_success] [查询记录] 成功: ', res.data)
  //     },
  //     fail: err => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: '查询记录失败'
  //       })
  //       console.error('[数据库] [查询记录] 失败：', err)
  //     }
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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