// pages/user/index.js
Page({
  data: {
    userinfo:{},
    myHonor:10,
    myMessage:0,
    mySituation:0,
    myPoint: 100
  },
  onShow(){
    const userinfo=wx.getStorageSync("userinfo");
    this.setData({userinfo});
      
  }
})