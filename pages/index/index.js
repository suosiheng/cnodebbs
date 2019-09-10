//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scroll_height: 0,
    page: 1,
    limit: 5,
    topics: [],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth  - 30
    })
    var that = this
    console.log(this.loading)
    that.getTopics(that.data.page, that.data.limit)
  },

  // 上拉加载
  upper: function(){
    var that = this
    if(that.data.page > 1){
      that.getTopics(that.data.page, that.data.limit)
      that.setData({
        page: that.data.page - 1
      })
    }

  },

  // 下拉刷新
  lower: function(){
    var that = this
    var p = that.data.page + 1
    that.getTopics(p, that.data.limit)
    that.setData({
      page: p
    })
    
  },

  getTopics: function(page, limit){
    var that = this
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: 'https://cnodejs.org/api/v1/topics', 
      data: {
        page: page,
        limit: limit,
        mdrender: false
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        if(res.data.success){
          that.setData({
            topics: that.data.topics.concat(res.data.data)
          })
          wx.hideLoading()
        }
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
