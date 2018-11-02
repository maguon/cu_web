const reqUtil = require('utils/ReqUtil.js')
const config = require('config.js');
//app.js
App({

  globalData: {
    userInfo: null,
    openid:'',
    userId: 0,
    accessToken: '',
  },
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
        var code=res.code;
        //数据请求
        reqUtil.httpGet(config.host.apiHost + "/api/wechat/" + code + "/openid", (err, res) => {
          that.globalData.openid=res.data.result.openid;
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        })
       }
    })
  },
  
})