// pages/user/user.js
var app = getApp();
const index = require('../index/index.js');
const config = require('../../config.js');
const reqUtil = require('../../utils/ReqUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    avatarUrl:'',
    wechatName:'',
    hasUserInfo: false,
    hidden:false,
    
    myCar:'未关联车辆',
    Phone:'',
    userSections: [{
      text: '个人资料',
      isunread: true,
      unreadNum: 2,
      url: "/pages/user/userMsg/userMsg"
    },
      {
        text: '绑定手机',
        url: "/pages/user/bind/bind"
      },{
        text: '我的订单',
        url: "/pages/user/order/order"
      },{
        text: '收货地址',
        url: "/pages/index/addressList/addressList"
      },
      {
        text: '当前版本',
        version:'0.0.4',
        url: ""
      }
      ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

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
    var userId = app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/userCar", (err, res) => {
      var num=0;
      if (res.data.result == '') {
        return;
      }
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].status == 1) {
          num++;
        }
      }
      this.setData({
        myCar: "关联车辆" + num + "台",
      })
    })

    if (app.globalData.userInfo.result[0].phone != null || app.globalData.userInfo.result[0].phone !='' ){
      this.setData({
        hidden: true,
        Phone: app.globalData.userInfo.result[0].phone,
      })
    }

    //保存
    this.setData({
      userInfo: app.globalData.userInfo,
      wechatName: app.globalData.userInfo.result[0].wechat_name,
      avatarUrl: app.globalData.userInfo.result[0].avatar_image,
      hasUserInfo: true,
    })
 
  },
  /**
   * 绑定手机
   */
  bindphone:function(){
    if (this.data.Phone == null || this.data.Phone == '') {
   

    }else{
    wx.navigateTo({
      url: '/pages/user/bind/bind',
    })
    }
  },
  /**
   * 点击关联车辆
   */
  relevanceCar:function(){
    console.log(this.data.Phone)

    if (this.data.Phone == null || this.data.Phone == ''){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请先绑定您的手机',
        success: function (res) { 
          if (res.confirm) {
            console.log('用户点击确定')
          } 
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/user/carList/carList',
      })
    }
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
  /**
   * 跳转页面
   */
  changeMenu:function(e){
    wx.navigateTo({
      url: e.target.dataset.url
    })
  }
})