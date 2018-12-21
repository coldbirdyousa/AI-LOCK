//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎使用智能锁',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wenzi:"",
    zhuangtai:"",
    kaiguan:0,
    action_tip:'',
    unlock:false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

 turntoshexiangtou:function(){
   wx.navigateTo({
     url: '../摄像头/摄像头',
   })
 },
 kaisuo:function(){//开锁
  wx.showNavigationBarLoading()
  this.setData({ 
  zhuangtai: "开" ,
  kaiguan:1,
  unlock:true,
  action_tip: '正在开门...'
  })
   setTimeout(function () {
     wx.showToast({
       title: '开锁成功',
       duration: 1000
     })
     wx.hideNavigationBarLoading()
   }, 1000) 
   setTimeout(() => {
     this.setData({
       action_tip: '',
     })
   }, 1000)
  this.sendRequset(this.makeObj(this.data.kaiguan,""));
 },
 guansuo:function(){//关锁
wx.showNavigationBarLoading()
   this.setData({
    zhuangtai:"关",
    kaiguan:0,
    unlock:false,
    action_tip:'正在关门...',
    })
   setTimeout(function () {
     wx.showToast({
       title: '关锁成功',
       duration: 1000
     })
     wx.hideNavigationBarLoading()
   }, 1000) 
   setTimeout( ()=> {
     this.setData({
       action_tip: '',
     })
   }, 1000) 
     
   this.sendRequset(this.makeObj(this.data.kaiguan,""));
 },

  sendRequset: function (obj) {
    wx.request(obj);
  },
  makeObj: function (kaiguan,msg) {
    var obj = {
      url: "https://api.heclouds.com/devices/503220620/datapoints?type=3",

      header: {
        "Content-Type": "application/json",
        "api-key": "r4Nfew99bzxSXyyPcMAmI9kaOZA=",
      },
      method: "post",
      data: {
        "kaiguan": kaiguan,
      },
      success: function (res) {
        if (msg != "") {
          wx.showToast({
            title: msg,
            duration: 2000
          })

        }
      }
    }
    return obj;
  },
  get_data: function () {
    // 获取数据
    var that = this;
    wx.request({
      url: 'https://api.heclouds.com/devices/503220620/datapoints?datastream_id=kaiguan&limit=1',
      header: {
        'content-type': 'application/json',
        'api-key': 'r4Nfew99bzxSXyyPcMAmI9kaOZA='
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: res.data.data.datastreams[0].datapoints[0].value?"锁已开":"锁已关",
          duration: 1000
        })
        console.log(res.data.data.datastreams[0].datapoints[0].value),
          that.setData({
            kaisuo: res.data.data.datastreams[0].datapoints[0].value,
          zhuangtai: res.data.data.datastreams[0].datapoints[0].value ? "开" : "关",
          })
      }
    })
  },
  onPullDownRefresh: function (options) {//获得onenet数据
    this.get_data()
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
