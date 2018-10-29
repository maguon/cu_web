//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: res => {
       console.log(res.code)
        // var code=res.code;
        // wx.request({
        //   url: "https://api.weixin.qq.com/sns/jscode2session?appid=wx694764f7676e75c3&secret=08baba525260e016ce793c7267133035&js_code="+code+"&grant_type=authorization_code",
        //    success: res => {
        //      that.globalData.openid=res.data.openid;
        //      console.log(res)
        //    }
        // })
      //   wx.request({
      //     url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx694764f7676e75c3&secret=08baba525260e016ce793c7267133035",
      //     success: res => {
      //       console.log(res)
      //     }
      //   })

       }
    })
   

   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res+"11111111111111")
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: 0,
    userId:0,
    count:0,
  }
})