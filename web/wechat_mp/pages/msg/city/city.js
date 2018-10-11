/// pages/index/city/city.js

const city = require('../../../service/city.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startCity: {},
    endCity: {},
    cityOriginList: [],
    cityFilterList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      refer: options.start
    })
    city.getCity((err, res) => {
      this.setData({ cityOriginList: res.data.result });
      this.setData({ cityFilterList: res.data.result });
    });
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

  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      citySearchValue: "",
      inputShowed: false,
      cityFilterList: this.data.cityOriginList
    });
  },
  clearInput: function () {
    this.setData({
      citySearchValue: "",
      cityFilterList: this.data.cityOriginList
    });
  },
  inputTyping: function (e) {
    let citySearchRegex = e.detail.value;
    let cityTempList = [];
    if (citySearchRegex == null || citySearchRegex == "") {
      this.setData({
        citySearchValue: "",
        cityFilterList: this.data.cityOriginList
      });
    } else {
      this.data.cityOriginList.map((item) => {
        if (item.city_name.includes(citySearchRegex)) {
          cityTempList.push(item);
        }
      });
      this.setData({ cityFilterList: cityTempList });
    }
  },
  selectCity: function (e) {
    if (this.data.refer == 1) {
      app.globalData.startCity = e.currentTarget.dataset
    } else {
      app.globalData.endCity = e.currentTarget.dataset
    }
    wx.navigateBack();
  }
})