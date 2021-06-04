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
  var data = null;
  var errMsg = 'OK';

  await db.collection('address').add({
    data: {
      _userid: wxContext.OPENID,
      district: event.district || '',
      community: event.community || '',
      specific_address: event.specific_address || ''
    }
  }).then(res => {
    // Get the address._id
    const addressid = res._id
    data = { addressid: addressid }

    const _ = db.command
    return db.collection('user').doc(wxContext.OPENID).update({
      data: {
        address: _.push(addressid)
      }
    })
  }).then(res => {
    errCode = 0
  }).catch(err => {
    errCode = 1
    data = err
    errMsg = 'Database: Address Add Fail'
  })

  return { errCode: errCode, errMsg: errMsg, data: data }
}