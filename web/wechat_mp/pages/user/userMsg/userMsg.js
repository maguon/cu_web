var app = getApp();
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')

Page({
  data: {
      determineTime: "",
      name: "",
     itemList: ['女', '男'],
      index:0,
      date:'1990-06-15',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
  },

   /**
   * 生命周期函数--监听页面显示
   */
 onShow:function(){
   var userid = app.globalData.userId;
   var that=this;
  //发送请求
   reqUtil.httpGet(config.host.apiHost + "/api/user?userId=" + userid, (err, res) => {
     console.log(res)
     if (res.data.result[0].user_name==null){
       that.setData({
         name: res.data.result[0].wechat_name,
       });
     }else{
       that.setData({
         name: res.data.result[0].user_name,
       });
     }
     if (res.data.result[0].birth ==null) {
     
     } else {
       that.setData({
         date: res.data.result[0].birth
       });
     }
     var t =new Date(res.data.result[0].auth_time);
     var Minutes = t.getMinutes();
     var Seconds = t.getSeconds();
     if (Minutes < 10) {
       Minutes = "0" + Minutes;
     }
     if (Seconds < 10) {
       Seconds = "0" + Seconds;
     }

     var olddata =t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + Minutes + ':' + Seconds;
     var olddata2 = olddata.replace(/-/g, "/");


     //保存
     that.setData({
       determineTime: "认证时间:" + olddata2,
       index: res.data.result[0].gender,
     });

   })
 },
 //判断用户输入
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
  /**
   * 点击确定
   */
  bindBntTap: function (e) {
    var userId = app.globalData.userId;
    //设置参数
    var params = {
      userName: this.data.name,
      gender: this.data.index,
      birth: this.data.date,
    }
    //发送请求
    reqUtil.httpPut(
      config.host.apiHost + '/api/user/' + userId, params, (err, res)=>{});
    //跳转页面
    wx.reLaunch({
      url: "/pages/user/user"
    })
  },
})