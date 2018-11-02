var app = getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryBean: [],
    carNumber: '',
    vin: '',
    engineNumber: '',
    loadingHidden:false,
    name:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    //加载动画
    setTimeout(() => {
      this.setData({
        loadingHidden: true,
      })
    }, 500);
    var that = this
    var queryBean = JSON.parse(e.queryBean);
    that.setData({
      queryBean: queryBean,
      name:e.name
    })

  },

  print: function () {
    wx.navigateTo({
      url: '/pages/index/print/print'
    })
  },
  sure:function(){
    if(this.data.name=="header"){
      wx.navigateBack({
      })
    }else{
    wx.reLaunch({
      url: '/pages/user/user',
    })
    }
  },


  unbind:function(){
    var userid = app.globalData.userId;
    var id=this.data.queryBean.id;
    reqUtil.httpDel(config.host.apiHost + '/api/user/' + userid + '/userCar/' + id);

    if (this.data.name == "header") {
      wx.navigateBack({
      })
    } else {
      wx.reLaunch({
        url: '/pages/user/user',
      })
    }
  }
})