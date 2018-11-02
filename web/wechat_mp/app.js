const reqUtil = require('utils/ReqUtil.js')
const config = require('config.js');
//app.js
App({
  //设置全局变量
  globalData: {
    userInfo: null,
    openid:'',
    userId: 0,
    accessToken: '',
  },

  /**
   * 异步执行登录信息加载
   */
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: res => {
        //获取code
        var code=res.code;
        //发送code 请求openid
        reqUtil.httpGet(config.host.apiHost + "/api/wechat/" + code + "/openid", (err, res) => {
          //保存openid 到全局
          that.globalData.openid=res.data.result.openid;
          //判断加载数据完成后执行login-onload
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        })
       }
    })
  },
  
})