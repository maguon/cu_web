//index.js
//获取应用实例
const app = getApp();
const config=require('../../config.js');
const reqUtil = require('../../utils/ReqUtil.js')
Page({
  data: {
    carList: [],
    bindCar:false,
    motto: '暂无关联车辆',
    mottosmall: '请到 “我的-关联车辆” 栏目下将您的爱车关联到本软件以便您在停放车辆的时候随时可接收到交警的通知',
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    loadingHidden:false, 
    userPhone:'',
    wechatName:'',
    avatarUrl:'',
    flag:false,
   
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }, 
  /**
   * 加载界面处理
   */
  onLoad: function () { 
  },

/**
 * 生命周期函数--监听页面初次渲染完成
 */
  onShow: function () {
    //发送请求
    var userId = app.globalData.userId;

    reqUtil.httpGet(config.host.apiHost + "/api/user?userId=" + userId, (err, res) => {
      //加载动画
      setTimeout(() => {
        this.setData({
          loadingHidden: true,
        })
      }, 500); 
      this.setData({
        userInfo: res.data,
        wechatName: res.data.result[0].wechat_name,
        avatarUrl: res.data.result[0].avatar_image,
        userPhone: res.data.result[0].phone,
        hasUserInfo: true
      })
      if (res.data.result[0].phone != null && res.data.result[0].phone!= "") {
        console.log(res.data.result)
        console.log(res.data.result[0].phone != "")
        console.log(res.data.result[0].phone != null)
        console.log('11111111')
        this.setData({
          flag: true,
        })
      }
    })

  

    //发送get请求
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + '/getMessage', (err, res) => {
      var count = 0;
      for(var i=0;i<res.data.result.length;i++){
        if (res.data.result[i].read_status == 0 && res.data.result[i].type != 1) {
          count++;
        }
      }
      if (count != 0){
      //获得消息数量
      wx.setTabBarBadge({
        index: 1,
        text:String(count),
      })
    }
    })
   
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/userCar", (err, res) => {

      var num = 0;
      if (res.data.result == '') {
        return;
      }
      for(var i=0;i<res.data.result.length;i++){
        if(res.data.result[i].status==1){
        num++;
        }
      }
      if(num>0){
        this.setData({
          carList: res.data.result,
          bindCar: true,
        })
      }else{
        this.setData({
          bindCar: false,
        })
      }
      
    })
  },
  //跳转详情界面
  bindCarDetail:function(e){
    var that = this
    //拿到点击的index下标
    var index = e.currentTarget.dataset.index;
    var name=e.currentTarget.dataset.name;
    //将对象转为string
     var queryBean = JSON.stringify(that.data.carList[index]);
    console.log(e)
    wx.navigateTo({
      // url: '/pages/index/car-detail/car-detail?queryBean='+queryBean
       url: '/pages/user/carList/editCar/editCar?queryBean=' + queryBean+"&name="+name
    })
  },

/**
 * getPhoneNumber 信息
 */
  getPhoneNumber:function(e){
    console.log(e)
    console.log(app.globalData.session_key)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    var that = this;
    var session_key = app.globalData.session_key;
    var iv = e.detail.iv;
    var encryptedData = e.detail.encryptedData;


    if (e.detail.errMsg != 'getPhoneNumber:ok') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请先绑定您的手机',
        success: function (res) { }
      })
    } else {
    wx.request({
      url: config.host.apiHost + "/api/WXBizDataCrypt",
      data: {
        userId: app.globalData.userId,
        sessionKey: session_key,
        iv: iv,
        encryptedData: encryptedData,
      },
      success: (res) => {
      wx.showModal({
          title: '提示',
          showCancel: false,
          content: '您已成功绑定',
          success: function (res) {
            that.onShow();
           }
        })
      }
    }) 
    }
  }
})


