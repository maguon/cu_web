var app = getApp();
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carList: [],
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    var carList=[];
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/userCar", (err, res) => {
      console.log(res)
      if (res.data.result == '') {
        return;
      }
      
      this.setData({
        carList: res.data.result,
      })
    })
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
  bindCarDetail:function(e){
    var that = this
    //拿到点击的index下标
    var index = e.currentTarget.dataset.index;
    var name=e.currentTarget.dataset.name;
    //将对象转为string
    var queryBean = JSON.stringify(that.data.carList[index]);
    wx.navigateTo({
      url: '/pages/user/carList/editCar/editCar?queryBean=' + queryBean+'&name='+name
    })
  },
  carList:function(){
    wx.navigateTo({
      url: '/pages/user/carList/addCar/addCar'
    })
  }
})