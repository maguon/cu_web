const app = getApp();
const config = require('../../../config.js');
const reqUtil = require('../../../utils/ReqUtil.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    addressList: [],
    price:5,
    num: 1,
    minusStatus: 'disabled',  
    hidden:false,

    imagePath:'',
    queryBean:[],
    product:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    wx.getStorage({
      key: 'qrcode',
      success: (res)=> {
        var queryBean = JSON.parse(e.queryBean);
        var product = JSON.parse(e.product);

        this.setData({
          imagePath: res.data,
          product: product,
          queryBean: e.queryBean,
        })
      },
    })
    
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var len = 0;
    var userId = app.globalData.userId;
    //发送get请求
    reqUtil.httpGet(config.host.apiHost + '/api/user/' + userId + "/userShipAddress", (err, res) => {
     //遍历列表并设置默认
      for(var i=0;i<res.data.result.length;i++){
        if (res.data.result[i].status==1){
          this.setData({
            addressList: res.data.result[i],
            hidden: true,
          })
        }
      }
    })
  },

  /**
   *  点击减号 
   */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    var price = num * 5;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      price: price,
      minusStatus: minusStatus
    });
  },

  /**
  *点击加号
   */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    if (num >= 10) {
      num = 10;
      wx.showModal({
        title: '提示',
        content: "最多可选打印数量为10个",
      })
    }
    var price=num*5;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      price:price,
      minusStatus: minusStatus
    });
  },

  /**
  *输入框事件
   */
  bindManual: function (e) {
    var num = e.detail.value;
    //添加提示
    if (num >= 10) {
      num = 10;
      wx.showModal({
        title: '提示',
        content: "最多可打印数量为10个",
      })
    }
    var price = num * 5;
    // 将数值与状态写回  
    this.setData({
      num: num,
      price: price,
    });
  },

/**
 * 跳转
 */
  bindButtonTap:function(){
    var price=this.data.price;
    var userId=app.globalData.userId;
    //设置参数
    var params = {
      productId:[this.data.product.id],
      prodCount: [this.data.num],
      remark: [this.data.product.product_remark],
      carId:[this.data.queryBean.id],

      freight:this.data.product.freight,
      imag: this.data.imagePath,
      recvName: this.data.addressList.ship_name,
      recvPhone: this.data.addressList.ship_phone,
      recvAddress: this.data.addressList.address,
      orderName: this.data.product.product_name,
    }
     //发送请求
    reqUtil.httpPost(
      config.host.apiHost + '/api/user/' + userId + '/order', params, (err, res) => { })
 

    wx.navigateTo({
      url: '/pages/user/order/order-detail/order-detail?price=' +this.data.product.original_price,
    })
  },
  product:function(){
    wx.navigateTo({
      url: '/pages/index/product-dt/product-dt'
    })
  },
  addRess:function(){
    wx.navigateTo({
      url: '/pages/index/addressList/addressList'
    })
  }
})