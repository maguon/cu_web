const app = getApp();
const config = require('../../../config.js');
Page({
  // 页面的初始数据
  data: {
    addressList: [],
  },
  
   //生命周期函数--监听页面加载
onLoad: function (options) {
  var userId = app.globalData.userId;

   wx.request({
     url: config.host.apiHost + '/api/user/' + userId +"/userShipAddress",
     header: {
       'Content-Type': 'application/json'
     },
     method: "GET",
     success: res => {
       this.setData({
         addressList : res.data.result,
       }) 
       var addressList = this.data.addressList;
       wx.getStorage({
         key: 'ress',
         success: res => {
           for (var i = 0, len = addressList.length; i < len; ++i) {
             addressList[i].checked = i == res.data;
           }
           this.setData({
             addressList: addressList,
           });
         },
       })
     }
   })
  },

  
  //生命周期函数--监听页面显示
  onShow: function () {
  },
  
  addAddress: function () {
    wx.navigateTo({ url: '../address/address' });
  },

//编辑item
editorAddress:function(e){
  var that = this
  //拿到点击的index下标
  var index = e.currentTarget.dataset.id;
  //将对象转为string
  var queryBean = JSON.stringify(that.data.addressList[index]);
  wx.navigateTo({
    url: '/pages/index/address/address?queryBean=' + queryBean
  })
  },

  // 删除item 
delAddress: function (e) {
    this.data.addressList.splice(e.target.id.substring(3), 1);
    // 更新data数据对象  
    if (this.data.addressList.length > 0) {
      this.setData({
        addressList: this.data.addressList
      })
      wx.setStorageSync('addressList', this.data.addressList);
    } else {
      this.setData({
        addressList: this.data.addressList
      })
      wx.setStorageSync('addressList', []);
    }
  },


  //单项选择控制
radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
     
    var addressList= this.data.addressList;
    console.log(addressList);
    for (var i = 0, len = addressList.length; i < len; ++i) {
      addressList[i].checked = i== e.detail.value;
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