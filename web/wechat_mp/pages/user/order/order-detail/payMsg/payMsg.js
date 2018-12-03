const app = getApp();
const config = require('../../../../../config.js');
const reqUtil = require('../../../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: ['退款信息', '支付信息'],
    timeState: ['退款时间','支付时间'],
    payState: ['退款金额','支付金额'],
    payMsgList:[],

    time:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var userId = app.globalData.userId;
    var orderId = e.orderId;
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/payment?orderId=" + orderId, (err, res) => {
      console.log(res)
      for (var i = 0; i < res.data.result.length;i++){
        res.data.result[i].created_on = this.Time(res.data.result[i].created_on);
        res.data.result[i].total_fee = this.money(res.data.result[i].total_fee);
      }
      this.setData({
        payMsgList:res.data.result,
      })
     
    })
  },
  /**
   * 共通编译时间
   */
  Time: function (e) {
    var t = new Date(e);
    var Minutes = t.getMinutes();
    var Seconds = t.getSeconds();
    if (Minutes < 10) {
      Minutes = "0" + Minutes;
    }
    if (Seconds < 10) {
      Seconds = "0" + Seconds;
    }

    var time = t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + Minutes + ':' + Seconds;
    var olddata = time.replace(/-/g, "/");
    return olddata;
  },

  money: function (e) {
    //钱数小数点后二位设定
    var total_price = Number(e);
    var money = total_price.toFixed(2);
    return money;
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