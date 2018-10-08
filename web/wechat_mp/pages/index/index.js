//index.js
//获取应用实例
const app = getApp();
const config = require('../../config.js')
const util = require('../../utils/util.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.contact'),
    
    sizeTypeIndex: 1,    
    carTypeIndex: 1,    
    serviceTypeIndex: 1,
    startCity :{},
    endCity:{}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../price/price'
    })
  },
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.startCity) {
      this.setData({
        startCity: app.globalData.startCity,
      })
    }
    if (app.globalData.endCity) {
      this.setData({
        endCity: app.globalData.endCity,
      })
    }
    this.setData({
      sizeTypes: config.priceConfig.sizeTypes,
      carTypes: config.priceConfig.carTypes,
      serviceTypes: config.priceConfig.serviceTypes,
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },  
  bindCarTypeChange: function (e) {    
    this.setData({
      carTypeIndex: e.detail.value
    })
  },
  bindSizeTypeChange: function (e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  bindServiceTypeChange: function (e) {
    this.setData({
      serviceTypeIndex: e.detail.value
    })
  },
  bindNaviStartCity :function(e){
    wx.navigateTo({
      url: '/pages/index/city/city?start=1'
    })
  },
  bindNaviEndCity: function (e) {
    wx.navigateTo({
      url: '/pages/index/city/city?start=0'
    })
  },
  bindQueryPrice: function(e){
    let params ={
      sizeType: this.data.sizeTypeIndex,
      carType: this.data.carTypeIndex,
      serviceType: this.data.serviceTypeIndex,
      startCityId : this.data.startCity.cid,
      startCityName : this.data.startCity.cname,
      endCityId : this.data.endCity.cid,
      endCityName: this.data.endCity.cname
    }
    if(util.objNullCheck(params)){
      const paramsUrl = util.objToQueryString(params);

      console.log(paramsUrl);
      wx.navigateTo({
        url: '/pages/price/price?' + paramsUrl
      })
    }else{
      wx.showModal({
        title: '错误',
        showCancel: false,
        content: '表单数据未完成'
      })
    }
    
  }
})
