var app = getApp();
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')

Page({
  data: {
      determineTime: "",
      name: "",
      itemList: ['男', '女'],
      index:0,
      date:'1990-06-15',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
   
  },
 onShow:function(){
   var userid = app.globalData.userId;
   var that=this;

   reqUtil.httpGet(config.host.apiHost + "/api/user?userId=" + userid, (err, res) => {
     console.log(res)
     that.setData({
       determineTime: "认证时间:" + res.data.result[0].auth_time,
       name: res.data.result[0].user_name,
       index: res.data.result[0].gender,
       date: res.data.result[0].birth
     });

   })
 },
  listenerReciverInput(e) {
    this.setData({
      name: e.detail.value,
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindSexChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindBntTap: function (e) {
    var userId = app.globalData.userId;

    var params = {
      userName: this.data.name,
      gender: this.data.index,
      birth: this.data.date,
    }
    
    reqUtil.httpPut(
      config.host.apiHost + '/api/user/' + userId, params, (err, res)=>{});

    wx.reLaunch({
      url: "/pages/user/user"
    })
  },
})