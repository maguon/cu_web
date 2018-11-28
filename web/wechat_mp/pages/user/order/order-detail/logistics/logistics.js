const app = getApp();
const config = require('../../../../../config.js');
const reqUtil = require('../../../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logisticsState:['发货信息','不发信息'],
    logisticsList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    var orderId = e.orderId;
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/log?orderId=" + orderId, (err, res) => {
      console.log(res.data.result[0]);
      if (res.data.result != '') {
        for (var i = 0; i < res.data.result.length;i++){
          res.data.result[i].created_on = this.Time(res.data.result[i].created_on);
        }

        this.setData({
          logisticsList: res.data.result,
          payment_status: 2,
          isDelivery: true,
        })
      }

    })

  },
  /**
 * 共通编译时间
 */
  Time: function (e) {
    var date = new Date(e);
    var localeString = date.toLocaleString();
    var t = new Date(localeString);
    var time = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
    return time;
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