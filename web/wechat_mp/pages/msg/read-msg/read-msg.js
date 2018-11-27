// pages/msg/read-msg/read-msg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryBean:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var queryBean = JSON.parse(e.queryBean);
    console.log(e.queryBean+'==============')
    this.setData({
      queryBean: queryBean,
    })

  },

  /**
    * 监听定位到当前位置
    */
  listenerBtnGetLocation: function () {
    wx.getLocation({
      //定位类型 wgs84, gcj02
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        wx.openLocation({
          //当前经纬度
          latitude: res.latitude,
          longitude: res.longitude,
          //缩放级别默认28
          scale: 28,
          //位置名
          name: '测试地址',
          //详细地址
          address: '火星路24号',
          //成功打印信息
          success: function (res) {
            console.log(res)
          },
          //失败打印信息
          fail: function (err) {
            console.log(err)
          },
          //完成打印信息
          complete: function (info) {
            console.log(info)
          },
        })

      },
      fail: function (err) {
        console.log(err)
      },
      complete: function (info) {
        console.log(info)
      },
    })
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    console.log(e)
    var index=e.currentTarget.dataset.value;
    var img ='http://tmp/wx694764f7676e75c3.o6zAJs0J27BdPDFb0Eo126HHzIFI.nY6oa4nYoqfS15f8686f46458edf918637eb85733a37.png';
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})