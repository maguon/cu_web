
const reqUtil = require('../../../utils/ReqUtil.js')
const app = getApp();
const config = require('../../../config.js');
var ressId='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
   name:'',
   phone:'',
   address:'',
   userId:'',
   addressList:[],
    add:"确认添加",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var addressList = JSON.parse(e.addressList);
    console.log(addressList)
    if (addressList!=""){
     this.setData({
       addressList: addressList,
       name: addressList.ship_name,
       phone: addressList.ship_phone,
       address:addressList.address,
       add:'确定修改'
     })
    }else{
    this.setData({
      addressList: addressList,
    })
    }
  },
  addName: function (e) {
    var name = e.detail.value;
    this.setData({
      name:name,
    })
  },
 userPhone: function (e) {
   var phone = e.detail.value;
    this.setData({
      phone: phone,
    })
  },
  addRess: function (e) {
    var address = e.detail.value;
    this.setData({
      address: address,
    })
  },
 /**
   * 添加地址
   */
  saveAddress: function (e) {
    var that = this;
    var warn='';
    var flag=true;
    var name = that.data.name;
    var phone =that.data.phone;
    var address = that.data.address;
    console.log(phone)
    console.log(name)
    console.log(address)
    var len = phone.length;
    // var arr = wx.getStorageSync('addressList') || [];
    var userId = app.globalData.userId;

   //判断用户输入
    if (name==""){
     warn="请输入您的姓名！";
    } else if (phone==""){
     warn="请输入您的手机号！";
    } else if (!(/^1(3|4||5|7|8)\d{9}$/.test(phone)) || len != 11 || phone.charAt(0)!='1'){
     warn="手机号码格式不正确";
   }else if(address==""){
     warn="请输入您的具体地址";
   }else{
     flag=false;
     if(that.data.addressList!=""){
       var params = {
         userName: name,
         phone: phone,
         address: address
       }
       //发送请求
       reqUtil.httpPut(config.host.apiHost + '/api/user/' + userId + "/shipAddress/" + that.data.addressList.id +"/info", params, (err, res) => { });
     }else{
     //获取要传递的参数
     var params={
       userName: name,
       phone: phone,
       address: address
     }
     //发送Post请求
     reqUtil.httpPost(config.host.apiHost + '/api/user/' + userId + "/userShipAddress", params, (err, res)=>{})
   }
     //跳转地址管理界面
     wx.navigateBack({
     })
   }
   //输入错误弹窗提示
   if(flag==true){
    wx.showModal({
      title: '提示',
      content: warn,
    })
   }
  },
})