// pages/index/submit/submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payList:[
      { name: '微信支付', src:'../../../assets/images/wepay.png', value: '0', checked: true },
      { name: '支付宝', src: '../../../assets/images/pay.png', value: '1' }
    ],
    price:'',
    clock:'',
    time:60000,

    bntFlag: false,
  },
  onLoad:function(e){
    console.log(e)
    var that = this;
    
    //时间倒计时
    this.data.intervarID = setInterval(function () {
     
      var Time = that.data.time - 1000; //每秒减少
      var hours = parseInt(Time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
      var minutes = parseInt(Time / 1000 / 60 % 60, 10);//计算剩余的分钟 
      var seconds = parseInt(Time / 1000 % 60, 10);//计算剩余的秒数 
    //设置分秒 格式
      hours = checkTime(hours);
      minutes = checkTime(minutes);
      seconds = checkTime(seconds);
      //同步
      that.setData({
        time:Time,
        clock: hours + ':' + minutes + ':' + seconds
      })
      //倒计时结束后处理
      if ( hours == '00' && minutes == '00' && seconds == '00') {
        clearInterval(that.data.intervarID);
        that.setData({
          bntFlag: true
        })
      }
    }, 1000
    )
   //money同步
    that.setData({
      price:e.price,
    })
  },

  
/**
 * 支付选择
 */
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var payList = this.data.payList;
    for (var i = 0, len = payList.length; i < len; ++i) {
      payList[i].checked = payList[i].value == e.detail.value;
    }

    this.setData({
      payList: payList
    });
  },
  returnHome:function(){
  //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
    wx.reLaunch({  
      url: '/pages/index/index'
    })
  }
})

function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
  if (i < 10) {
    i = "0"+i;
  }
  return i;
}
