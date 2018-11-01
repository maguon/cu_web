var app = getApp();
const config = require('../../config.js');
const reqUtil = require('../../utils/ReqUtil.js')
Page({
  data: {
    falg:false,
    msgList:[],
    color: '',
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
      // var len = res.data.result.length;
      // for (var i; i <= len; i++) {
      //   if (res.data.result.status != 0) {
      //     res.data.result[i].color = '#999999'
      //     this.setData({
      //       falg: true,
      //     })
      //     return;
      //   }
      // }
      
      this.setData({
        msgList: res.data.result,
      })
      console.log(res)
    })
  },
  //事件处理函数
  bindMsg:function(e){
    var index = e.currentTarget.dataset.id;
    var msg = this.data.msgList[index];
    var len = this.data.msgList.length;
    var msgList=this.data.msgList;
    // msg.color = '#999999';
    // for(var i;i<=len;i++){
    
    // }
    // console.log(msgList)
    // this.setData({
    //   color: '#999999',
    // })
    wx.navigateTo({
      url: "/pages/msg/read-msg/read-msg"
    })
  }
})
