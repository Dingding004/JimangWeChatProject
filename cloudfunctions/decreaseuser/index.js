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

  if (event.field != 'point') {
    return { errCode: 2, errMsg: 'Invalid field', data: data }
  }

  const _ = db.command
  await db.collection('user').doc(wxContext.OPENID).get().then(res => {
    const point = res.data.point
    const newpoint = point - event.value
    if (newpoint < 0) {
      errCode = 2
      errMsg = 'Database: User does not have enough point'
      return
    }

    db.collection('user').doc(wxContext.OPENID).update({
      data: {
        point: _.set(newpoint)
      }
    })
  }).catch(err => {
    errCode = 1
    data = err
    errMsg = 'Database: User Decrease Fail'
  })

  return { errCode: errCode, errMsg: errMsg, data: data }
}