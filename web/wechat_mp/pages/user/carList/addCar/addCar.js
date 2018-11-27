var app = getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')
var QR = require("../../../../utils/qrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
   carMsg:[{
     license_plate:'',
     engine_num:'',
     vin:''
   }],
    imagePath: '',
    warn:'',
    placeholder: 'http://wxapp-union.com'//默认二维码生成文本
  },
 
 /**
   * 保存信息
   */
  saveAddress: function (e) {
    var that = this;
    var warn = '';
    var flag = true;
    var header = e.detail.value.header;
    var vin = e.detail.value.vin;
    var carNumber = e.detail.value.carNumber;
    var userId = app.globalData.userId;

    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/userCar", (err, res) => {
      console.log(res)
      for (var i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].status==1){
        if (header == res.data.result[i].license_plate || vin==res.data.result[i].vin) {
          console.log("8888888888888")
          that.setData({
            warn :"该车辆已被绑定",
          })
         }
        }
      }
   
    console.log(that.data.warn)
    if(that.data.warn!=''){
      warn=that.data.warn;
    }else{
    //判断用户输入
    if (header == "") {
      warn = "请输入您的车牌号";
    } else if (vin=='') {
      warn = "请您输入车辆识别码";
    } else if (vin.length != 17) {
      warn = "您输入的车辆识别码不足17位";
    }else if (carNumber == "") {
      warn = "请您输入车辆发动机号";
    } else {
      flag = false;
      that.setData({
        //赋值到数组
     carMsg: [{
          license_plate: header,
          engine_num: carNumber,
          vin: vin,
        }]
      });  
      //设置参数
     var params={
        vin: vin,
        engineNum: carNumber,
        licensePlate: header
      }
      //发送请求
      reqUtil.httpPost(
        config.host.apiHost + '/api/user/' + userId + '/userCar', params,(err, res) => {})
       }
    }

    //弹出提示框
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn,
      })
      return;
    } 
    //跳转并传递参数
     var queryBean = JSON.stringify(that.data.carMsg[0]);
      wx.navigateTo({
        url: "/pages/user/carList/editCar/editCar?queryBean=" + queryBean+'&name='+ "",
      }) 
    })  
  },

})