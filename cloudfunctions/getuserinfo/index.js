// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()
  var errCode = 0;
  var errMsg = 'OK';
  var userdata = {
    _id: wxContext.OPENID,
    point: 0,
    address:[],
    default_address: 0,
    phone_number: '',
    authority: 0
  }

  await db.collection('user').doc(wxContext.OPENID).get().then(res => { 
    // user exists
    userdata = res.data
  }, err => {
    // register user
    db.collection('user').add({
      data: userdata
    })
  })
  return { errCode: errCode, errMsg: errMsg, data: userdata }
}