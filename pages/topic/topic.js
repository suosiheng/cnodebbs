//Page Object
const app =  getApp();

  
Page({
    data: {
        scroll_height: 0,
        topicinfo: {}
    },
    //options(Object)
    onLoad: function(options){
        let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
        let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
        this.setData({
            scroll_height: windowHeight * 750 / windowWidth  - 30
        })
        var that = this
        console.log(options)
        wx.request({
            url: 'https://cnodejs.org/api/v1/topic/' + options.id, 
            data: {
                mdrender: true
              },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              console.log(res.data)
              if(res.data.success){
                //   console.log(res.data.data.replies.length)
                // 评论样式
                for(var i = 0; i < res.data.data.replies.length; i++){
                    let content = app.towxml.toJson(res.data.data.replies[i].content, 'markdown')
                    //设置文档显示主题，背景颜色，默认'light'
                    // content.theme = 'dark';  
                    // console.log(content, 6666666666)
                    res.data.data.replies[i].content = content
                    res.data.data.replies[i].ups_num = res.data.data.replies[i].ups.length
                    
                }

                // 正文样式
                let content = app.towxml.toJson(res.data.data.content, 'markdown')
                res.data.data.content = content
                that.setData({
                    topicinfo: res.data.data
                })
                wx.hideLoading()
              }
            }
          })
    },
    onReady: function(){
        
    },
    onShow: function(){
        
    },
    onHide: function(){

    },
    onUnload: function(){

    },
    onPullDownRefresh: function(){

    },
    onReachBottom: function(){

    },
    onShareAppMessage: function(){

    },
    onPageScroll: function(){

    },
    //item(index,pagePath,text)
    onTabItemTap:function(item){

    }
});