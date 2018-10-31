
const reqUtil = require('../../../utils/ReqUtil.js')
const app = getApp();
const config = require('../../../config.js');
var ressId='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
   userId:'',
   queryBean:[],
   add:"添加",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
  },

 
  saveAddress: function (e) {
    var warn='';
    var flag=true;
    var consignee = e.detail.value.consignee;
    var mobile = e.detail.value.mobile;
    var address = e.detail.value.address;
    var len=mobile.length;
    var arr = wx.getStorageSync('addressList') || [];
    var userId = app.globalData.userId;

   //判断用户输入
   if(consignee==""){
     warn="请输入您的姓名！";
   }else if(mobile==""){
     warn="请输入您的手机号！";
   } else if (!(/^1(3|4||5|7|8)\d{9}$/.test(mobile)) || len!=11||mobile.charAt(0)!='1'){
     warn="手机号码格式不正确";
   }else if(address==""){
     warn="请输入您的具体地址";
   }else{
     flag=false;
     var that=this;
     var params={
       userName: consignee,
       phone: mobile,
       address: address
     }
     reqUtil.httpPost(config.host.apiHost + '/api/user/' + userId + "/userShipAddress", params, (err, res)=>{

     }
     )
     wx.navigateBack({
       url: "/pages/index/addressList/addressList"
     })
   }
   //弹出提示框
   if(flag==true){
    wx.showModal({
      title: '提示',
      content: warn,
    })
   }
  },
})