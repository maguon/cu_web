// pages/user/user.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userSections: [{
      text: '我的订单',
      isunread: true,
      unreadNum: 2,
      url:"../order/index"
    }, 
    {
      text: '收货地址管理',
      url: "../address/index"
    }, {
      text: '发票管理',
      url: "../invoice/index"
    }, {
      text: '问题反馈',
      url: "../feedback/index"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的',
    })
    this.setData({userInfo:app.globalData.userInfo})
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