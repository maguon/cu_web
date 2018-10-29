var app = getApp();
var carId = '';
const config = require('../../../../config.js');
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
     carMsg: [{
          license_plate: header,
          engine_num: carNumber,
          vin: vin,
        }]
      });  
      wx.request({
        url: config.host.apiHost + '/api/user/' + userId +'/userCar',
        header: {
          'Content-Type': 'application/json'
        },
        method:"POST",
        data:{
          vin:vin,
          engineNum:carNumber,
          licensePlate:header
        },
        success:res=>{
          carId=res.data.id;
        }
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
     var queryBean = JSON.stringify(that.data.carMsg[0]);
      wx.navigateTo({
        url: "/pages/user/relevance/editCar/editCar?queryBean=" + queryBean,
      })
      
     app.globalData.count++;
    
  },

})