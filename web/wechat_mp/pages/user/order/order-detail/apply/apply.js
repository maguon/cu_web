const app = getApp();
const config = require('../../../../../config.js');
const reqUtil = require('../../../../../utils/ReqUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    botton:['提交申请','修改申请'],
    index:0,
    orderId:'',
    value:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    if (e.apply==''){
      this.setData({
        orderId: e.orderId,
        index: 0,
      })
    }else{
     this.setData({
       orderId:e.orderId,
       value: e.apply,
       index: 1,
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

  },
  saveAfterSale:function(e){
    var orderId=this.data.orderId;
    var userId = app.globalData.userId;
    var applyReason=e.detail.value.apply;
    var params = {applyReason: applyReason}

    if (applyReason == '') {
      wx.showToast({
        title: '请填写您的申请原因',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    //发送Post请求
    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/orderFeedback", params, (err, res) => {
      wx.showToast({
        title: '申请已提交，客服会在24小时内为你处理，请耐心等待',
        icon: 'none',
        duration: 2000,
      })
      wx.setStorage({
        key: 'orderFeedbackid',
        data: res.data.id,
      })
      setTimeout(()=>{
        wx.navigateBack({
        })
      },2000)
      // wx.navigateTo({
      //   url: '/pages/user/order/order-detail/after-sale/after-sale',
      // })
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