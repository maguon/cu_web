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
    license_plate: '',
    engine_num:'',
    vin:'',
    imagePath: '',
    content:'',
    placeholder: 'http://wxapp-union.com'//默认二维码生成文本
  },
 
  header:function(e){
 var header=e.detail.value;
 this.setData({
   license_plate:header,
 })
  },
  vin:function(e){
    var vin = e.detail.value;
    this.setData({
      vin: vin,
    })
  },
  carNumber:function(e){
    var carNumber = e.detail.value;
    this.setData({
      engine_num: carNumber ,
    })
  },
 /**
   * 保存信息
   */
  saveQrcode: function (e) {
    console.log("00000000000000")
    var that = this;
    var warn = '';
    var flag = true;

    var header = that.data.license_plate;
    var vin = that.data.vin;
    var carNumber = that.data.engine_num;
    var userId = app.globalData.userId;
 
    //判断用户输入
    if (header == "") {
      warn = "请输入您的车牌号";
    } else if (vin=='') {
      warn = "请您输入车辆识别码";
    } else if (vin.length <17) {
      warn = "您输入的车辆识别码不足17位";
    } else if (vin.length > 17) {
      warn = "您输入的车辆识别码超出17位";
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
        config.host.apiHost + '/api/user/' + userId + '/userCar', params,(err, res) => {
          console.log(res)
          if(res.data.success==false){
            wx.showModal({
              title: '提示',
              content: res.data.msg,
            })
            return;
          }
          //跳转并传递参数
          var queryBean = JSON.stringify(that.data.carMsg[0]);
          wx.navigateTo({
            url: "/pages/user/carList/editCar/editCar?queryBean=" + queryBean + '&name=' + "",
          })

        })
    }

    //弹出提示框
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn,
      })
      return;
    } 
   
  },

})