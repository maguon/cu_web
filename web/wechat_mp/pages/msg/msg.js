
Page({
  data: {
    falg:false,
  },
  //事件处理函数
  bindMsg:function(){
    wx.navigateTo({
      url: "/pages/msg/read-msg/read-msg"
    })
  }
})
