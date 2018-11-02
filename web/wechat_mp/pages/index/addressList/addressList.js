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
    //获取userid
    var userId = app.globalData.userId;
    //发送get请求
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/userShipAddress", (err, res) => {
      //赋值本地
      this.setData({
        addressList: res.data.result,
      })
    })
  },

  /**
   * 添加地址按钮
   */
  addAddress: function () {
    wx.navigateTo({ url: '../address/address' });
  },

/**
   * 删除item
   */
delAddress: function (e) {
  var index = e.currentTarget.dataset.id;
  var userId = app.globalData.userId;
  var addressList = this.data.addressList[index];
//发送请求
  reqUtil.httpDel(config.host.apiHost + '/api/user/' + userId + "/shipAddress/" + addressList.id);
  //更新信息
    this.onShow();
  },

/**
   *单项选择控制
   */
radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
 
    var addressList= this.data.addressList;
    //判断用户点击index设置默认
    for (var i = 0, len = addressList.length; i < len; ++i) {
      addressList[i].status = i== e.detail.value;
    }
    //获取参数
    var params = {status: true}
    var userId = app.globalData.userId;
    var shipAddressId=addressList[e.detail.value].id;
    //发送PUT
  reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/shipAddress/' + shipAddressId+'/default', params, (err, res) => {})

    this.setData({
      addressList: addressList,
    });
  },

  /**
   * 点击跳转
   */
  useRess:function(){
   wx.navigateBack({
    url: '/pages/index/print/print',
  });
  }
})