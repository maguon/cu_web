const app= getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   state: ['待发货', '待支付', '已发货', '处理中', '已处理', '已退款'],
   applytext:['申请售后','查看售后'],
   rank:0,
   status:0,
   product:[],
   apply:[],
   price:0,
   orderId:'',
   name:'',

   isPay:false,
   isApply:false,
   isDelivery:false,
   applyState:false,

   staterTime:'',
   payTime:'',
   outTime:'',
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
    })

    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/order?orderId="+e.orderId, (err, res) => {
    console.log(res)
      if (res.data.result[0].payment_status==1){
      console.log("未支付")
      }else{
     this.setData({
       isPay: true,
     })  
    }
     var created_on = this.Time(res.data.result[0].created_on);
     var updated_on = this.Time(res.data.result[0].updated_on);
     this.setData({
       product :res.data.result[0],
       price:e.price,
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
    var orderFeedback_id = '';
    var apply = ''; 
    
    wx.getStorage({
      key: 'orderFeedbackid',
      success: function(res) {
        orderFeedback_id=res.data;
      },
    })
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/orderFeedback?orderId=" + orderId, (err, res) => {
    
      for(var i=0;i<res.data.result.length;i++){
        if (res.data.result[i].id == orderFeedback_id){
            apply=res.data.result[i];
        }
      }
      var newCreated_on = this.Time(apply.created_on);
      var status = apply.status;
     if(res.data.result!=''){
       if (apply.apply_reason==''){
         apply.apply_reason='请填写您的申请原因';
       }
       this.setData({
         apply: apply,
         applyTime: newCreated_on,
         isApply: true,
         rank:1,
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
    return localeString;
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

    wx.navigateTo({
      url: '/pages/index/pay/wxpay/wxpay?orderId=' + orderId,
    })
  },

  afterSale:function(){
    var orderId = this.data.orderId;
    var status = this.data.status;
    var apply=this.data.apply.apply_reason;
    if (apply == undefined) { apply=''}
    if (status==0){
    wx.navigateTo({
      url: '/pages/user/order/order-detail/apply/apply?orderId=' + orderId+'&apply='+apply,
    })
    }else{
      wx.navigateTo({
        url: '/pages/user/order/order-detail/after-sale/after-sale?orderId='+ orderId,
      })
    }
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