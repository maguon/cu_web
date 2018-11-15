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
   orderId:'',

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
    console.log(e)
    //保存
    this.setData({
      orderId:e.orderId,
    })

    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/order?orderId="+e.orderId, (err, res) => {
     console.log(res)
     this.getTime(res);
     this.setData({
       product :res.data.result[0],
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
  cancelOrder:function(e){
    var that = this;
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var orderId = that.data.orderId;
    wx.showModal({
      content: "你确定要取消订单？",
      success(res) {
        var params = '';
        if (res.confirm) {
          reqUtil.httpPut(config.host.apiHost + '/api/user/' + app.globalData.userId + '/order/' + orderId + "/status/" + 1, params, (err, res) => { })
          wx.reLaunch({
            url: '/pages/index/index',
          })
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
    var orderId=this.data.orderId;

    wx.navigateTo({
      url: '/pages/index/pay/wxpay/wxpay?orderId=' + orderId,
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