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

  if (event.field == null || event.value == null) {
    return { errCode: 2, errMsg: 'Invalid field', data: data }
  }
  const config = event.config || "DefaultConfig"

  const _ = db.command

  await db.collection('global').doc(config).update({
    data: {
      [event.field]: _.set(event.value),
    }
  }).catch(err => {
    errCode = 1
    data = err
    errMsg = 'Database: Global Set Fail'
  })

  return { errCode: errCode, errMsg: errMsg, data: data }
}