// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  const userdata = {
    _id: openid,
    point: 0,
    address:[],
    default_address: null,
    phone_number: null,
    authority: 0
  }
  db.collection('user').doc(openid).get().then(res => { 
    // user exists
    return res.data
  }, err => {
    // register user
    db.collection('user').add({
      data: userdata
    })
  })

  return userdata
}