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
   state: ['未处理','已处理'],

   created_on:'',
   updated_on: '',
   hidden:false,
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
    var that=this;
    var orderId = that.data.orderId;
    var userId = app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/orderFeedback?orderId=" + orderId, (err, res) => {
    
      var afterSale=res.data.result[res.data.result.length-1];
      var newCreated_on = this.Time(afterSale.created_on);
      var newUpdated_on = this.Time(afterSale.updated_on);
      if (afterSale.status==1){
        that.setData({
          hidden:true,
        })
      }

      console.log(afterSale)
      this.setData({
        afterSale: afterSale,
        created_on: newCreated_on,
        updated_on: newUpdated_on,
      })
    })

  },
  /**
 * 共通编译时间
 */
  Time: function (e) {
    var date = new Date(e);
    var localeString = date.toLocaleString();
    return localeString;
  },

  bindFormSubmit:function(e){
    console.log(e)
    var userId=app.globalData.userId;
    var orderId = this.data.orderId;
    var applyReason = e.detail.value.apply;
    var params = {applyReason: applyReason }

    //发送Post请求
    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId + "/orderFeedback", params, (err, res) => {
      wx.showToast({
        title: '申请已修改，客服会在24小时内为你处理，请耐心等待',
        icon: 'none',
        duration: 2000,
      })
      // setTimeout(() => {
      //   wx.navigateBack({
      //   })
      // }, 2000)
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