const app = getApp();
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  hidden:false,
  orderList:[],
  state: ['未支付','待发货','已发货','已退款','已补发','已付款'],
  page_state:1,

  loadingHidden:false,
  created_on:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //加载动画
    setTimeout(() => {
      this.setData({
        loadingHidden: true,
      })
    var userId = app.globalData.userId;
      reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/order", (err, res) => {
      console.log(res)

      for (var i = 0; i < res.data.result.length; i++) {      
        var len = res.data.result[i];
        res.data.result[i].page_state = 1;
        if (len.payment_status!=0){
          res.data.result[i].flag=true;
          res.data.result[i].isPay=true;
          res.data.result[i].isApply = true;
        }
        if (len.log_status == 1 ){
          res.data.result[i].page_state = 2;
        }
        if (len.log_status == 2) {
          res.data.result[i].page_state = 5;
   
        }
        
        var date = new Date(len.created_on);
        var localeString = date.toLocaleString();
        res.data.result[i].created_on = localeString;
      }
      this.setData({
        orderList: res.data.result,
      })
    })
    }, 500)
  },
  /**
   * 取消订单
   */
  cancelOrder: function (e) {
    var that=this;
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var orderId = that.data.orderList[index].id;
    wx.showModal({
      content: "你确定要取消订单？",
      success(res) {
        var params='';
        if (res.confirm) {
          reqUtil.httpPut(config.host.apiHost +'/api/user/'+ app.globalData.userId+'/order/'+orderId+"/status/"+1,params, (err, res) => {})
          that.setData({
            loadingHidden: false,
          })
          that.onShow();
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
  payment: function (e) {
    var that = this;
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var name = e.currentTarget.dataset.name;
    var orderList = JSON.stringify(that.data.orderList[index]);
    var total_price = that.data.orderList[index].total_price;
    wx.navigateTo({
      url: '/pages/index/pay/wxpay/wxpay?orderList=' + orderList + "&price=" + total_price+"&name="+name,
    })
  },
  /**
   * 跳转详情页
   */
  orderDetail:function(e){
    var that = this;
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var name = e.currentTarget.dataset.name;
    var orderId = that.data.orderList[index].id;
    var  userId = app.globalData.userId;
    var imgPath='';
    var imgPathIndex='';
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + '/product', (err, res) => {
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].id == 1000) {
           var price= res.data.result[i].unit_price;
           imgPathIndex= i;
        }
      }
      imgPath = config.host.imageHost + "/api/image/" + res.data.result[imgPathIndex].img

      wx.navigateTo({
        url: '/pages/user/order/order-detail/order-detail?orderId=' + orderId + "&price=" + price + "&name=" + name + '&imgPath=' + imgPath,
      })
    })
  },
// /**
//  * 申请售后
//  */
//   apply:function(e){
//     console.log(e)
//     var index = e.currentTarget.dataset.index;
//     var orderId=this.data.orderList[index].id;
//     var userId=app.globalData.userId;
//     var apply='';

//     reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/orderFeedback?orderId=" + orderId, (err, res) => {
//       console.log(res)
//       if (res.data.result==''){
//         wx.navigateTo({
//           url: '/pages/user/order/order-detail/apply/apply?orderId=' + orderId + "&apply=" + "",
//         })
//       }else{
//       wx.showModal({
//         title: '提示',
//         content: '申请售后已提交，等待商家处理',
//       })
//       }
//     })
//   },
//   /**
//    * 查看售后
//    */
//   check:function(e){
//     console.log(e)
//    var index = e.currentTarget.dataset.index;
//     var orderId = this.data.orderList[index].id;
//    var userId = app.globalData.userId;
//     reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/orderFeedback?orderId=" + orderId, (err, res) => {
//       wx.navigateTo({
//         url: '/pages/user/order/order-detail/after-sale/after-sale?orderId=' + orderId,
//       })
//     })  
//   },

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