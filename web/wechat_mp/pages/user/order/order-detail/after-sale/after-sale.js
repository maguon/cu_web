const app = getApp();
const config = require('../../../../../config.js');
const reqUtil = require('../../../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   orderId:'',
   afterSale:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
   this.setData({
     orderId:e.orderId,
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
    var orderId=this.data.orderId;
    var userId = app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/orderFeedback?orderId=" + orderId, (err, res) => {
      console.log(res)
      wx.getStorage({
        key: 'orderFeedbackid',
        success: function(e) {
          for (var i = 0; i < res.data.result.length; i++) {
            if (res.data.result[i].id = e.data) {
              this.setData({
                afterSale: res.data.result[i],
              })
            }
          }
        },
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

  }
})