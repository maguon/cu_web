const app= getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   state: ['未支付', '待发货', '已发货','已退款','已补发'],

   paymentStatus:0,
   product:[],
   apply:[],
   price:0,
   sum:0,
   orderId:'',
   name:'',
   imgPath:'',

   isPay:false,
   isApply:false,
   isDelivery:false,

   staterTime:'',
   payTime:'',
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
      name:e.name,
      imgPath: e.imgPath,
    })

    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/order?orderId="+e.orderId, (err, res) => {
    console.log(res)
      if (res.data.result[0].payment_status==0){
        this.setData({
          paymentStatus: 0,
          isPay:false,
        })  
      }else{
     this.setData({
       paymentStatus:1,
       isPay: true,
     })  
    }
     var sum = res.data.result[0].total_freight + res.data.result[0].total_price;
     var created_on = this.Time(res.data.result[0].created_on);
     var updated_on = this.Time(res.data.result[0].updated_on);
     this.setData({
       product :res.data.result[0],
       price:e.price,
       sum:sum,
       staterTime: created_on,
       payTime: updated_on,
     })
    })
    
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var userId = app.globalData.userId;
    var orderId = this.data.orderId;
 
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/orderFeedback?orderId=" + orderId, (err, res) => {

      //不为空 执行 
     if(res.data.result!=''){
       //时间
       var apply = res.data.result[res.data.result.length - 1];
       var newCreated_on = this.Time(apply.created_on);
      //
       if (apply.apply_reason==''){
         apply.apply_reason='请填写您的申请原因';
       } 

       this.setData({
         apply: apply,
         applyTime: newCreated_on,
         isApply: true,
       })
     }
    })
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/log?orderId=" + orderId, (err, res) => {
      console.log(res.data.result[0]);
      if (res.data.result != '') {
        //更新物流状态
        reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/order/" + orderId + "/logStatus/" + 1, "", (err, res) => { })

        this.setData({
          paymentStatus: 2,
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
          if(that.data.name=="order"){
            wx.navigateBack({})
          }else{
            wx.navigateBack({
              delta: 2
            })
        }
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
    var price = this.data.sum;
    var name=this.data.name;
    wx.navigateTo({
      url: '/pages/index/pay/wxpay/wxpay?orderId=' + orderId+"&name="+name+"&price="+price,
    })
  },

/**
   * 付款信息
   */
  paymentMsg:function(){
    var orderId = this.data.orderId;
    wx.navigateTo({
      url: "/pages/user/order/order-detail/payMsg/payMsg?orderId=" + orderId,
    })
  },
  /**
   * 发货信息
   */
  deliverMsg:function(){
    var orderId = this.data.orderId;
    wx.navigateTo({
      url: "/pages/user/order/order-detail/logistics/logistics?orderId=" + orderId,
    })
  },

/**
 * 申请按钮
 */
  afterSale:function(){
    var userId=app.globalData.userId;
    var orderId = this.data.orderId;
    var apply=this.data.apply.apply_reason;
    if (apply == undefined) { apply=''}

    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/orderFeedback?orderId=" + orderId, (err, res) => {
    if (res.data.result==''){
    wx.navigateTo({
      url: '/pages/user/order/order-detail/apply/apply?orderId=' + orderId+'&apply='+apply,
    })
      // wx.showModal({
      //   title: '提示',
      //   content: '申请售后已提交，等待商家处理',
      // })
    }else{
      wx.navigateTo({
        url: '/pages/user/order/order-detail/after-sale/after-sale?orderId='+ orderId,
      })
    }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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