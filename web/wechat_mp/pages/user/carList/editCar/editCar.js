var app = getApp();
const config = require('../../../../config.js');
const reqUtil = require('../../../../utils/ReqUtil.js')
var QR = require("../../../../utils/qrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryBean: [],
    carNumber: '',
    vin: '',
    engineNumber: '',
    loadingHidden:false,
    canvasHidden: false,
    name:'',

    hidden: false,
    imagePath:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {    
    //解析json
    var queryBean = JSON.parse(e.queryBean);
    console.log(e)
   this.setData({
      queryBean: queryBean,
      name:e.name
    })
  },

/**
 * 生命周期函数--监听页面初次渲染完成
 */
  onShow:function(){
    this.setData({
      loadingHidden: false,
    })
    var userId = app.globalData.userId;
    var carId = this.data.queryBean.id;
    //获取code
    reqUtil.httpPost(config.host.apiHost + "/api/user/" + userId + '/userCar/' + carId + '/qrCode', "", (err, res) => {
      var initUrl = config.host.apiHost + '/api/qrCode/' + res.data.result.code;
      this.createQrCode(initUrl, "mycanvas", 100, 100);
    })
    //设置确定按钮
    if (this.data.name != "") {
    this.setData({
      hidden:true,
    })
    }else{
      this.setData({
        hidden: false,
      })
    }
  
  },
/**
 * 请求生成二维码
 */
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => { 
      this.canvasToTempImage();
     }, 1000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      destWidth: 100,
      destHeight:100,
      canvasId: "mycanvas",
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        that.setData({
         imagePath: tempFilePath,
         loadingHidden: true,
        });
      },
      fail: function (err) {
      //   // 可能会有其他报错 还是拦截一下吧
      //   if (err.errMsg === "canvasToTempFilePath: fail canvas is empty") {
      //     // 一次不行再试一遍 两次都不过就放弃吧
      //     console.log("000000000")
      //     count += 1;
      //     if (count < 3) {
      //      this.canvasToTempImage();
      //     }
      //     else {
      //       // 错了这么多遍基本没救了
      //     }
      //  }
        console.log(err);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
/**
 * 跳转页面
 */
  print: function () {
    var userId=app.globalData.userId;
    var queryBean = JSON.stringify(this.data.queryBean);
    var index='';
    var imgPath='';
    reqUtil.httpGet(config.host.apiHost + "/api/user/" + userId +'/product',(err,res)=>{
     
      for (var i = 0; i < res.data.result.length;i++){
        if(res.data.result[i].id==1000){
          index=i;
        }
      }

      imgPath = config.host.imageHost + "/api/image/" + res.data.result[index].img

      var product = JSON.stringify(res.data.result[index]);
      wx.navigateTo({
        url: '/pages/index/print/print?queryBean=' + queryBean + '&product=' + product+'&imgPath='+imgPath,
      })
    })
  },
  /**
   * 下载
   */
  downLoadImg:function(e){
    this.setData({
      loadingHidden: false,
    })
    //加载动画
    setTimeout(() => {
      this.setData({
        loadingHidden: true,
      })
    }, 500);
    wx.downloadFile({
      url: this.data.imagePath, //仅为示例，并非真实的资源
      success:(res)=> {
        console.log(res)
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.playVoice({
            filePath: res.tempFilePath
          })
        }
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success:
            function (data) {
              console.log(data);
              wx.showModal({
                title: '下载成功',
                content: '下载成功',
              })
            },
        })
      },
      fail:(err)=>{
        console.log('下载失败');
        console.log(this.data.imagePath)
      }
    })
  },
  /**
   * 确定按钮
   */
  sure:function(){
    //判断上级页面并跳转
    if(this.data.name==""){
      wx.navigateBack({
        delta: 2
      })
    }else{
      wx.navigateBack({
    })
    }
  },

 /**
   * 解绑按钮
   */
  unbind:function(){
    var userid = app.globalData.userId;
    var id=this.data.queryBean.id;
    reqUtil.httpPut(config.host.apiHost + '/api/user/' + userid + '/userCar/' + id + '/status/' + 0, "",(err,res)=>{});
    
   //判断上级页面并跳转
    if (this.data.name == "") {
      wx.navigateBack({
        delta:2
      })
    } else {
      wx.navigateBack({
      })
    }
  }
})