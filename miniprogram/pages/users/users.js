// miniprogram/pages/users/users.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inited:true,
    count:0,
    users:[],
    userFlex: "flex: 0 0 10%;",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    // 查询参加总数
    db.collection('event_joins').where({
      event_id: 'XCYin4nnuWjciuy7'
    }).limit(100).get({
      success: res => {
        if (res.data.length > 0) {
          this.setData({
            count: res.data.length,
            users: res.data
          })
        }

        console.log('[数据库event_joins] [查询总用户数] 成功: ', res.data)

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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})