var app=getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wechatName:'',
    avatarUrl:'',

    payList:[],
    totalPrice:0.01,
    goodsList:[
      { goods_name:"商品二维码"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (e) {
    console.log(e)
    this.setData({
      totalPrice:e.price,
      payList:e.payList,
    })
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        wechatName: app.globalData.userInfo.result[0].wechat_name,
        avatarUrl: app.globalData.userInfo.result[0].avatar_image,
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
  payment:function(){

    
  },
/**
 * 支付方法
 */
  pay: function () {                                                                         
  var that = this
  var openid=app.globalData.openid;
  var userInfo=app.globalData.userInfo;
  console.log(userInfo);

    var params = {
      //用户的openid
      openid: app.globalData.openid,
      fee: that.data.totalPrice, //支付金额
      details: that.data.goodsList[0].goods_name,//支付商品的名称
    }
    //发送Post请求
    reqUtil.httpPost(config.host.apiHost + "", params, (err, res) => {
      if (res.data) {
        //out_trade_no=res.data['out_trade_no'];
        wx.requestPayment({
          timeStamp: res.data['timeStamp'],
          nonceStr: res.data['nonceStr'],
          package: res.data['package'],
          signType: 'MD5',
          paySign: res.data['paySign'],
          'success': function (successret) {
            console.log('支付成功');
            var params = {
              //用户的openid
              openid: app.globalData.openid,
              uname: userInfo.result[0].wechat_name,
              goods: that.data.goodsList[0].goods_name,
              price: that.data.totalPrice,
            }
            reqUtil.httpPost(config.host.apiHost + "", params, (err, res) => {
              console.log("存取成功");
            })
      }
      })
      }
    })
  },

})