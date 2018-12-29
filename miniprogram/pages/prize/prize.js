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
    isParticipated:true,
    joinUsers:7,
    joinUserCount:2048
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let prize = JSON.parse(options.prize);
    this.setData({
      prize: prize
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  joinGame:function(){
    if (this.data.isParticipated){
      return
    }
  },
  goToUsers:function(){
    wx.navigateTo({
      url: '../users/users'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})