var app=getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payList:[],
    totalPrice:0,
    orderId:'',
    order:[],
    name:'',
    goodsList:[
      { goods_name:"商品二维码"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (e) {
  var order=JSON.parse(e.orderList);
    console.log(order)
    this.setData({
      orderId: order.id,
      totalPrice:e.price,
      order:order,
      name:e.name,
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

  },

/**
 * 支付方法
 */
  payment: function () {                                                                         
  var that = this
  var openid=app.globalData.openid;
  var userInfo=app.globalData.userInfo;
  var userId=app.globalData.userId;
  var orderId = that.data.orderId;

    var params = {
      //用户的openid
      openid: app.globalData.openid,
      totalFee: that.data.totalPrice, //支付金额
      status: 1,//支付商品的名称
    }
    console.log(app.globalData.openid)
    //发送Post请求
    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + "/order/" + orderId+"/wechatPayment", params, (err, res) => {
      console.log(res.data.result)

        //out_trade_no=res.data['out_trade_no'];
        wx.requestPayment({
          timeStamp: res.data.result[0].timeStamp+"",
          nonceStr: res.data.result[0].nonce_str,
          package:'prepay_id='+res.data.result[0].prepay_id,
          signType: "MD5",
          paySign: res.data.result[0].paySign,
          success: (res)=> {
            console.log(that.data.order.order_name)
            console.log(that.data.order.remark)
            console.log(that.data.order.prod_count)
            var param={
              productDes: that.data.order.order_name + that.data.order.remark + that.data.order.prod_count,
              type:0,
            }
            console.log('支付成功');
             reqUtil.httpPut(config.host.apiHost + "/api/user/"+userId+"/order/"+orderId+"/paymentStatus/"+1, param, (err, res) => {
               console.log("存取成功");
             })
            wx.showToast({
             title: '支付成功',
             icon: 'success',
             duration: 2000
            })
           if(this.data.name=="payment"){
             wx.navigateBack({
             })
           } else if (this.data.name == "order") {
             wx.navigateBack({
               delta: 2
             })
           }else{
            wx.navigateBack({
              delta:3
            })
            }
      },
      fail:function(err){
        console.log('支付失败')
        console.log(err)
        wx.showToast({
             title: '支付失败',
          icon: 'none',
             duration: 2000
        })
      }
      })  
    })
  },

})