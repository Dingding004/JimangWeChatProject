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

  if (event.addressid == null) {
    return { errCode: 2, errMsg: 'Invalid addressid', data: data }
  }
  const _ = db.command
  await db.collection('address').doc(event.addressid).update({
    data: {
      district: _.set(event.distric || ''),
      community: _.set(event.community || ''),
      specific_address: _.set(event.specific_address || '')
    }
  }).catch(err => {
    errCode = 1
    data = err
    errMsg = 'Database: Address Update Fail'
  })

  return { errCode: errCode, errMsg: errMsg, data: data }
}