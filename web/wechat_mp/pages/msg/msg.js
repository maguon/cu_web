var app = getApp();
const config = require('../../config.js');
const reqUtil = require('../../utils/ReqUtil.js')
Page({
  data: {
    falg:false,
    msgList:[],
  },

  onLoad:function(){
    var userId = app.globalData.userId;

    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + '/getMessage', (err, res) => {
      if (res.data.result==''){
        this.setData({
          falg:true,
        })
        return;
      }
      this.setData({
        msgList: res.data.result,
      })
      console.log(res)
    })
  },
  //事件处理函数
  bindMsg:function(e){
    var index = e.currentTarget.dataset.id;
    var msgList = this.data.msgList[index];
    console.log(msgList)
    wx.navigateTo({
      url: "/pages/msg/read-msg/read-msg"
    })
  }
})
