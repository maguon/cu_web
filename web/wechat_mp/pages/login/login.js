const config = require('../../config.js');
const reqUtil = require('../../utils/ReqUtil.js')
//获取应用实例
const app = getApp()
Page({
  
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loadingHidden: false,
  },
  
  onLoad: function () {
    app.userInfoReadyCallback = res => {
      if (res != '') {
    var that = this;
    
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            loadingHidden: true,
          })
          wx.getUserInfo({
            success: res=> {

              var params = {
                wechatId: app.globalData.openid,
                wechatName:res.userInfo.nickName,
                gender: res.userInfo.gender,
                avatarImage: res.userInfo.avatarUrl,
              }

              reqUtil.httpPost(config.host.apiHost + "/api" + "/userLogin", params, (err, res) => {
                //userid保存到全局
                app.globalData.userId=res.data.result.userId;
                app.globalData.accessToken=res.data.result.accessToken;
                //从数据库获取用户信息
                that.queryUsreInfo();
                //用户已经授权过
                wx.switchTab({
                  url: '/pages/index/index',
                })
              })
              
            }
          });
        }
      }
    })
   }
  }
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      var params={
        wechatId: app.globalData.openid,
        wechatName: e.detail.userInfo.nickName,
        gender: e.detail.userInfo.gender,
        avatarImage: e.detail.userInfo.avatarUrl,
      }
      reqUtil.httpPost(config.host.apiHost + "/api" + "/userLogin", params, (err, res) => {

        app.globalData.userId = res.data.result.userId;
        app.globalData.accessToken = res.data.result.accessToken;
        //从数据库获取用户信息
        that.queryUsreInfo();
        console.log(res.data.result.userId);
        console.log("插入小程序登录用户信息成功！");
      })
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },


  //获取用户信息接口
  queryUsreInfo: function () {
    var userId=app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + "/api/user?userId=" + userId, (err, res) => {
      getApp().globalData.userInfo = res.data;
    })
  },
})

