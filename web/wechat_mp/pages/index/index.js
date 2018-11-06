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
    hidden: false,
   
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
    //加载动画
    setTimeout(() => {
      this.setData({
        loadingHidden: true,
      })
    }, 500);

    var userId = app.globalData.userId;
    //获取信息
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        wechatName: app.globalData.userInfo.result[0].wechat_name,
        avatarUrl: app.globalData.userInfo.result[0].avatar_image,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      console.log(app.globalData.userInfo)
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          //保存信息
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })

    }
    //发送get请求
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + '/msgStat?userType=' + 1, (err, res) => {
      var count = String(res.data.result[0].count);
      //获得消息数量
      wx.setTabBarBadge({
        index: 1,
        text: count,
      })
    })

    //判断是否绑定手机
    if (app.globalData.userInfo.result[0].phone != '') {
      this.setData({
        userPhone: app.globalData.userInfo.result[0].phone,
        hidden: true
      })
    }
    //发送请求
    var userId = app.globalData.userId;
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId + "/userCar", (err, res) => {
      if (res.data.result == '') {
        return;
      }
      this.setData({
        carList: res.data.result,
        bindCar: true,
      })
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
      console.log(e.detail.errMsg)
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)

  }
})


