// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    swiperList:[]
  },
  // 事件处理函数
  onLoad: function(options){
    wx.request({
      url: 'url',
    })
  }
})