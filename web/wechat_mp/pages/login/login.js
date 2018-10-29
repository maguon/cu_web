
//获取应用实例
const app = getApp()
Page({
  
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loadingHidden: false,
  },
  
  onLoad: function () {
    var that = this;
   //取出userid
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        app.globalData.userId = res.data;
      },
    })
    
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            loadingHidden: true,
          })
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
               that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: "http://stg.myxxjs.com:9201" + "/api" + "/userLogin",
        method: "POST",
        data: {
          wechatId: app.globalData.openid,
          wechatName: e.detail.userInfo.nickName,
          gender:e.detail.userInfo.gender,
          avatarImage: e.detail.userInfo.avatarUrl,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //userid保存到缓存
          wx.setStorage({
            key: 'userId',
            data: res.data.result.userId,
          })
          app.globalData.userId = res.data.result.userId;
          //从数据库获取用户信息
          that.queryUsreInfo();
          console.log(res.data.result.userId);
          console.log("插入小程序登录用户信息成功！");
        }
      });
      console.log(getApp().globalData.openid+"---openid")
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }

    wx.getSetting({
      success:res=>{
        console.log(res.authSetting)
      }
    })
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    wx.request({
      url: "http://stg.myxxjs.com:9201" + "/api/user",
      data: {
        userId: app.globalData.userId,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data);
        getApp().globalData.userInfo = res.data;
      }
    });
  },

})

