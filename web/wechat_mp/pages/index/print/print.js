const app = getApp();
const config = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    addressList: [],
    price:5,
    num: 1,
    minusStatus: 'disabled',  
    hidden:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   
    // let data=wx.getStorageSync('addressList');

    // console.log(data);
    // this.setData({
    //   addressList:data,
    // })
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
    var len = 0;
    var userId = app.globalData.userId;
    wx.request({
      url: config.host.apiHost + '/api/user/' + userId + "/userShipAddress",
      header: {
        'Content-Type': 'application/json'
      },
      method: "GET",
      success: res => {
        var addressList = res.data.result;
        wx.getStorage({
          key: 'ress',
          success: res => {
            if (res.data == '') {
              this.setData({
                addressList: addressList[res.data],
                hidden:false,
              })
              return;
            }
            this.setData({
              addressList: addressList[res.data],
              hidden: true,
            })
            
          },
        })
      }
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

  },

  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    var price = num * 5;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      price: price,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    if (num >= 10) {
      num = 10;
      wx.showModal({
        title: '提示',
        content: "最多可选打印数量为10个",
      })
    }
    var price=num*5;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      price:price,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    if (num >= 10) {
      num = 10;
      wx.showModal({
        title: '提示',
        content: "最多可打印数量为10个",
      })
    }
   
    var price = num * 5;
  
    // 将数值与状态写回  
    this.setData({
      num: num,
      price: price,
    });
  },


  bindButtonTap:function(){
    wx.navigateTo({
      url: '/pages/index/submit/submit'
    })
  },
  product:function(){
    wx.navigateTo({
      url: '/pages/index/product-dt/product-dt'
    })
  },
  addRess:function(){
    wx.navigateTo({
      url: '/pages/index/addressList/addressList'
    })
  }
})