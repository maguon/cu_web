// pages/user/relevance/editCar/editCar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryBean: [],
    carNumber: '',
    vin: '',
    engineNumber: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var queryBean = JSON.parse(options.queryBean);
    that.setData({
      queryBean: queryBean
    })
  },

  print: function () {
    wx.navigateTo({
      url: '/pages/index/print/print'
    })
  },
  sure:function(){
    wx.reLaunch({
      url: "/pages/user/user"
    })
  },
  unbind:function(){
    wx.reLaunch({
      url: "/pages/user/user"
    })
  }
})