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
    totalPrice:1,
    orderId:20101118,
    goodsList:[
      { goods_name:"商品二维码"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (e) {
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

    this.pay();
  },
/**
 * 支付方法
 */
  pay: function () {                                                                         
  var that = this
  var openid=app.globalData.openid;
  var userInfo=app.globalData.userInfo;
  var userId=app.globalData.userId;

  console.log(userInfo);

    var params = {
      //用户的openid
      openid: app.globalData.openid,
      totalFee:1, //支付金额
      status: 1,//支付商品的名称
    }
    console.log(app.globalData.openid)
    //发送Post请求
    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/order/" + 2018142 +"/wechatPayment", params, (err, res) => {
      console.log(res.data.result)

        //out_trade_no=res.data['out_trade_no'];
        wx.requestPayment({
          timeStamp: res.data.result[0].timeStamp+"",
          nonceStr: res.data.result[0].nonce_str,
          package:'prepay_id='+res.data.result[0].prepay_id,
          signType: "MD5",
          paySign: res.data.result[0].paySign,
          success: (res)=> {
            console.log(res)
            console.log('支付成功');
            var params = {
              //用户的openid
              openid: app.globalData.openid,
              uname: userInfo.result[0].wechat_name,
              goods: that.data.goodsList[0].goods_name,
              price: that.data.totalPrice,
            }
            // reqUtil.httpPost(config.host.apiHost + "", params, (err, res) => {
            //   console.log("存取成功");
            // })
            wx.showToast({
             title: '支付成功',
             icon: 'success',
             duration: 2000
            })
      },
      fail:function(err){
        console.log('支付失败')
        console.log(err)
        wx.showToast({
             title: '支付失败！请稍后再试',
             icon: 'success',
             duration: 2000
        })
      }
      })  
    })
  },

})