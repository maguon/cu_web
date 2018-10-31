const app = getApp();
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({
  // 页面的初始数据
  data: {
    addressList: [],
  },
  
   //生命周期函数--监听页面加载
onLoad: function (options) {

  },

  
  //生命周期函数--监听页面显示
  onShow: function () {

    var userId = app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/userShipAddress", (err, res) => {
      this.setData({
        addressList: res.data.result,
      })
      var addressList = this.data.addressList;
      wx.getStorage({
        key: 'ress',
        success: res => {
          for (var i = 0, len = addressList.length; i < len; ++i) {
            addressList[i].status  = i == res.data;
          }
          if (addressList.length == 1) {
            addressList[0].status  = 0 == res.data;
          }
          this.setData({
            addressList: addressList,
          });
        },
      })
    })
  },
  
  addAddress: function () {
    wx.navigateTo({ url: '../address/address' });
  },


  // 删除item 
delAddress: function (e) {
  var index = e.currentTarget.dataset.id;
  var userId = app.globalData.userId;
  var addressList = this.data.addressList[index];

  reqUtil.httpDel(config.host.apiHost + '/api/user/' + userId + "/shipAddress/" + addressList.id);
    this.onShow();
  },


  //单项选择控制
radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
     
    var addressList= this.data.addressList;
    console.log(addressList);
    for (var i = 0, len = addressList.length; i < len; ++i) {
      addressList[i].status = i== e.detail.value;
    }
    wx.setStorage({
      key: 'ress',
      data: e.detail.value,
    });
  
    this.setData({
      addressList: addressList,
    });
  },
  useRess:function(){
   wx.navigateBack({
    url: '/pages/index/print/print',
  });
  }
})