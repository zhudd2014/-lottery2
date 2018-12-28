// miniprogram/pages/detail/detail.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    describe: '',
    openid: '',
    join_nums: 0,
    pics: '',
    prize: '',
    prize_num: '',
    status: 0,
    queryResult: '',
    hasJoined: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('event').where({
      index: 1
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          title: res.data[0].title,
          describe: res.data[0].describe,
          join_nums: res.data[0].join_nums,
          pics: res.data[0].pics,
          prize_num: res.data[0].prize_num,
          status: res.data[0].status,
        })
        console.log('[数据库] [查询记录] 成功: ', res.data[0])
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })

    // 查询当前用户有无参加
    db.collection('event_joins').where({
      _openid: this.data.openid,
      event_id: 'XCYin4nnuWjciuy7'
    }).get({
      success: res => {
        if (res.data.length > 0) {
          this.setData({
            hasJoined: true
          })
        }
        console.log('[数据库event_joins] [查询当前用户有无参加] 成功: ', res.data)

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

  },
  /**
   * 为什么不生效？？
   */
  modifynum: function() {
    const updateCount = 12;
    const db = wx.cloud.database()
    db.collection('event').doc('XCYin4nnuWjciuy7').update({
      data: {
        join_nums: updateCount,
      },
      success: res => {
        console.log('[数据库event] [更新总人数] 成功: ', updateCount);
        this.setData({
          join_nums: updateCount
        })
      },
      fail: err => {
        icon: 'none',
        console.error('[数据库event] [更新记录] 失败：', err)
      }
    });
  },
  onAdd: function() {

    const db = wx.cloud.database()
    db.collection('event_joins').add({
      data: {
        event_id: 'XCYin4nnuWjciuy7',
        join_openid: this.data.openid
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          hasJoined: true
        });

        //更新参与人数
        db.collection('event_joins').where({
          event_id: 'XCYin4nnuWjciuy7',
        }).get({
          success: res => {
            const updateCount = res.data.length;
            console.log('[数据库event_joins] [查询需更新总人数] 成功: ', updateCount);

            db.collection('event').doc('XCYin4nnuWjciuy7').update({
              data: {
                join_nums: updateCount
              },
              success: res => {
                console.log('[数据库event_joins] [更新总人数] 成功: ', updateCount);
                this.setData({
                  join_nums: updateCount
                })
              },
              fail: err => {
                icon: 'none',
                console.error('[数据库event] [更新记录] 失败：', err)
              }
            });


          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
          }
        });

        wx.showToast({
          title: '报名成功',
        })
        console.log('[数据库event_joins] [新增记录] 成功，记录 _id: ', open_id)


      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
})