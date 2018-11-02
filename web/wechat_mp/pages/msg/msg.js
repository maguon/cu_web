var app = getApp();
const config = require('../../config.js');
const reqUtil = require('../../utils/ReqUtil.js')
Page({
  data: {
    falg:false,
    msgList:[],
    color: '',
  },

  onShow:function(){
    var userId = app.globalData.userId;

    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + '/getMessage', (err, res) => {
      if (res.data.result==''){
        this.setData({
          falg:true,
        })
        return;
      }
      //UTC 时间格式转译
      var len = res.data.result.length;
      for (var i=0;i <len; i++) {
        var date = new Date(res.data.result[i].created_on);
        var localeString = date.toLocaleString();
        res.data.result[i].created_on = localeString;
        console.log(localeString);
      }
      //保存
      this.setData({
        msgList: res.data.result,
      })
      console.log(res)
    })
  },
  //事件处理函数
  bindMsg:function(e){
    console.log(e)
    var userId=app.globalData.userId;
    var index = e.currentTarget.dataset.id;
    var id=this.data.msgList[index].id;
    var len = this.data.msgList.length;
    var msgList=this.data.msgList;
    var params='';

    for (var i=0; i < len; i++) {
      msgList[i].status = i == index;
    }
    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/msg/' + id + '/status/'+1, params, (err, res) => {})
    var queryBean = JSON.stringify(this.data.msgList[index]);
    wx.navigateTo({
      url: "/pages/msg/read-msg/read-msg?queryBean=" + queryBean
    })
  }
})
