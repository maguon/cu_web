// pages/user/user.js
var app = getApp()
 const index = require('../index/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    avatarUrl:'',
    wechatName:'',
    phoneNumber:'',
    hasUserInfo: false,
    
    myCar:'未关联车辆',
    nullPhone:'未绑定手机',
    userSections: [{
      text: '个人资料',
      isunread: true,
      unreadNum: 2,
      url: "/pages/user/userMsg/userMsg"
    },
      {
        text: '绑定手机',
        url: "/pages/user/bind/bind"
      }, {
        text: '关联车辆',
        url: "/pages/user/relevance/relevance"
      },{
        text: '我的订单',
        url: ""
      },{
        text: '收货地址',
        url: "/pages/index/addressList/addressList"
      },
      {
        text: '当前版本',
        version:'1.0.1',
        url: ""
      }
      ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({ 
      userInfo: app.globalData.userInfo,
      wechatName: app.globalData.userInfo.result[0].wechat_name,
      avatarUrl: app.globalData.userInfo.result[0].avatar_image,
      myCar: "相关车辆" + app.globalData.count + "台",
      hasUserInfo: true,
       })
  
    //获取绑定手机
    var bindPhone = wx.getStorageSync("bindPhone") || '未绑定手机';
      this.setData({
        nullPhone:bindPhone,
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
  
  },
  changeMenu:function(e){
    wx.navigateTo({
      url: e.target.dataset.url
    })
  }
})