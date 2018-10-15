//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '暂无关联车辆',
    mottosmall: '请到 “我的-关联车辆” 栏目下将您的爱车关联到本软件以便您在停放车辆的时候随时可接收到交警的通知',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  bindCarDetail:function(){
    wx.navigateTo({
      url: '/pages/index/detail/detail'
    })
  }
})
// module.exports = {
//   userInfo:userInfo,
//   hasUserInfo: hasUserInfo,
//   canIUse:wx.canIUse,
// }
