// pages/test/index.js
Page({
  getuserinfo() {
    wx.cloud.callFunction({
      name:"getuserinfo",
      data :{}
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log("?")
    })
  },
  addaddress() {
    wx.cloud.callFunction({
      name:"addaddress",
      data :{
        district: '1xx',
        community: 'community',
        specific_address: 'dwadaw302'
      }
    }).then(res => {
      console.log('1')
      console.log(res)
    }, err=> {
      console.log('?')
    })
  },

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})