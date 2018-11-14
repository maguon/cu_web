const app = getApp();
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  hidden:false,
  orderList:[],

  isPay: false,
  isApply: false,

  created_on:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var userId = app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/orderItem", (err, res) => {
      console.log(res)
      for (var i = 0; i < res.data.result.length; i++) {
        var len = res.data.result[i];
        var date = new Date(len.created_on);
        var localeString = date.toLocaleString();
        res.data.result[i].created_on = localeString;
      }
      this.setData({
        orderList: res.data.result,
      })
    })
  },
  /**
   * 取消订单
   */
  cancelOrder: function (e) {
    var that=this;
    console.log(e)
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      content: "你确定要取消订单？",
      success(res) {
        if (res.confirm) {
          
          reqUtil.httpDel(config.host.apiHost + '/api/user/' + app.globalData.userId + '/orderItem/' + that.data.orderList[index].id)

          that.onShow();
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
  payment: function () {
    wx.navigateTo({
      url: '/pages/index/pay/wxpay/wxpay',
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

  }
})