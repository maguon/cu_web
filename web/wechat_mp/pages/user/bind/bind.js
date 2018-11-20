var app = getApp();
const config=require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindPhone:"",
    userPhone:'',
    userCode:'',

    key:"获取验证码",
    gainFlag:false,

    bntFlag:true,
    hidden:false,

  },
  /**
   * 生命周期函数--监听页面加载
   */
onLoad:function(e){
},


  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
  var userId = app.globalData.userId;
  //发送请求
  reqUtil.httpGet(config.host.apiHost + "/api/user?userId=" + userId, (err, res) => {
  if(res.data.result[0].phone!=''){
    this.setData({
      bindPhone:res.data.result[0].phone,
      hidden: true
    })
   }
  })
},
/** 
 *  获取用户手机输入
 */
checkPhone:function(e){
   this.setData({
      userPhone:e.detail.value,
    })
},


/** 
*  获取验证码
*/
gain:function(){
  var userPhone=this.data.userPhone
  //检查手机号码输入
  if (userPhone==''){ 
    wx.showModal({
      title: '提示',
      content: "手机号码不能为空",
    })
    return;
  }else if (!(/^1(3|4||5|7|8)\d{9}$/.test(userPhone)) || userPhone.length != 11 || userPhone.charAt(0) != '1') {
    wx.showModal({
      title: '提示',
      content: "手机号码格式不正确",
    })
    return;
  }
  //调用60秒验证码发送
 var second=60;
  var userid = app.globalData.userId;
 this.countDown(second);
//请求验证码
  var params='';
  reqUtil.httpPost(config.host.apiHost + "/api/user/" + userid + '/phone/' + userPhone + "/userPhoneSms", params, (err, res) => {
  })
},

/** 
 *  60秒发送等待
 */
countDown:function(num){
  this.setData({
     gainFlag:true,
     key:num
    });
    //time 为0 返回原始状态
  if(num<0){
     this.setData({
    key:'获取验证码',
    gainFlag:false});
    return;
  }
//递归每秒递减
 setTimeout(()=>{
   this.countDown(num-1);
 },1000)
},

/** 
 * 输入验证码
 */
code:function(e){
  var userCode=e.detail.value;
  console.log(userCode)
  //判断用户输入
  if (e.detail.value.length!=4){
    this.setData({
      bntFlag: true
    });
   return;
  }else{
    //保存信息 
  this.setData({
    userCode:userCode,
    bntFlag:false //激活确定按钮
  });
  }
},

/** 
 * 确认按钮
 */
 bindTap(e){ 
   var userid = app.globalData.userId;
   var userPhone=this.data.userPhone;
   var userCode=this.data.userCode;
   //设置参数
   var params={
     phone: userPhone,
     signCode: userCode,
     suthStatus:0
   }
   //发送请求
    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userid + '/userPhone', params,(err,res)=>{
      if(res.data.success!=true){
      wx.showModal({
        title: '提示',
        content: res.data.msg,
      })
      return;
      }else{
        //校对一致后跳转界面
        wx.reLaunch({
          url: "/pages/user/user"
        })
      }
 })
  },
})