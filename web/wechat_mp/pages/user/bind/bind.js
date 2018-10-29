
const config=require('../../../config.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindPhone:"请先绑定您的手机",
    userPhone:'',
    userCode:'',
    trueCode:'',

    key:"获取验证码",
    gainFlag:false,

    bntFlag:true,

  },

onLoad:function(e){
  var bindPhone = wx.getStorageSync("bindPhone") ||'';
  if (bindPhone!=''){
   this.setData({
   bindPhone: "当前绑定号码为" +bindPhone,
   });
}
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
  var userPhone=this.data.userPhone;
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
 this.countDown(second);
//请求验证码
 wx.request({
   url: config.host.apiHost+"/api/phone/"+userPhone+"/passwordSms",
   method:"POST",
   success:res=>{
     this.setData({
       //保存验证码
       trueCode:res.data.result.code,
     });
     console.log(res.data)
   }
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
   //判断用户输入
    if (this.data.userCode.length!=4){
      wx.showModal({
        content: "您输入的验证码不正确",
      })
      return;
    }
    //核对短信验证码与用户输入是否一致
   var{userCode,trueCode}=this.data;
   //不一致处理
   if(userCode!=trueCode){
     wx.showModal({
       content: "您输入的验证码不正确",
     })
     return;
   }
   wx.setStorageSync('bindPhone', this.data.userPhone);
   //一致后跳转界面
    wx.reLaunch({
      url: "/pages/user/user"
    })
  },
})