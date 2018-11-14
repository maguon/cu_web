const app= getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   state:["待支付","待发货"],
   product:[],
   price:0,

   isPay:false,
   isApply:false,
   isDelivery:false,

   staterTime:'',
   payTime:'',
   outTime:'',
   applyTime:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/order", (err, res) => {
     console.log(res)
     this.getTime(res);
     this.setData({
       product :res.data.result[res.data.result.length - 1],
       price:e.price,
     })
    })
  },

/**
 * 编译时间
 */
 getTime:function(e){
   var len=e.data.result[e.data.result.length - 1]
   var date = new Date(len.created_on);
   var localeString = date.toLocaleString();
  this.setData({
    staterTime :localeString,
  })
 },

 /**
  * 取消订单
  */
  cancelOrder:function(){
    wx.showModal({
      content: "你确定要取消订单？",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 付款
   */
  payment:function(){
    wx.navigateTo({
      url: '/pages/index/pay/wxpay/wxpay',
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

  }
})