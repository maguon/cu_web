var app = getApp();
const config = require('../../config.js');
const reqUtil = require('../../utils/ReqUtil.js')
Page({
  data: {
    falg:false,
    msgList:[],
    color: '',
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){
    var userId = app.globalData.userId;
    //发送请求
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + '/getMessage', (err, res) => {
      if (res.data.result==''){
        this.setData({
          falg:true,
        })
        return;
      }
      
      var count = 0;
      //UTC 时间格式转译
      var len = res.data.result.length;
      for (var i=0;i <len; i++) {
        if (res.data.result[i].read_status == 0 && res.data.result[i].type != 1){
          count++;
        }
        if (res.data.result[i].type== 1) {
          res.data.result[i].type=false;
        }
        var date = new Date(res.data.result[i].created_on);
        var localeString = date.toLocaleString();
        var t = new Date(localeString);
        res.data.result[i].created_on=t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
      }
      if(count!=0){
      //获得消息数量
      wx.setTabBarBadge({
        index: 1,
        text: String(count),
      })
    }
      //保存
      this.setData({
        msgList: res.data.result,
      })
      //打印出来看一看
      console.log(res)
    })
  },

  /**
   * 事件处理函数
   */
  bindMsg:function(e){
    console.log(e)
    var userId=app.globalData.userId;
    var index = e.currentTarget.dataset.id;
    var id=this.data.msgList[index].id;
    var len = this.data.msgList.length;
    var msgList=this.data.msgList;
    var params='';
    //循环判断用户点击
    for (var i=0; i < len; i++) {
      msgList[i].read_status = i == index;
    }
    //发送请求
    reqUtil.httpPut(config.host.apiHost + "/api/user/" + userId + '/msg/' + id + '/status/'+1, params, (err, res) => {})
    var queryBean = JSON.stringify(this.data.msgList[index]);
    //实现跳转并传递参数
    wx.navigateTo({
      url: "/pages/msg/read-msg/read-msg?queryBean=" + queryBean
    })
  }
})
