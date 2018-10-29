

Page({
  data: {
      determineTime: "",
      name: "",
      itemList: ['男', '女'],
      index:0,
      date:'1990-06-15',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
   
    wx.getStorage({
      key: 'userMsg',
      success: res=> {
        console.log(res)
        this.setData({
          name: res.data.name,
          index: res.data.sex,
          date: res.data.date,
        })
      },
    })
  },

  listenerReciverInput(e) {
    this.setData({
      name: e.detail.value,
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindSexChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindBntTap: function (e) {
    wx.setStorage({
      key: "userMsg",
      data:{
        name: this.data.name,
        sex :this.data.index,
        date:this.data.date,
      } 
    })
  //  wx.request({
  //    url: '',
  //  })

    wx.reLaunch({
      url: "/pages/user/user"
    })
  },
})