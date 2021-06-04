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

  if (event.orderid == null) {
    return { errCode: 2, errMsg: 'Invalid orderid', data: data }
  }

  const _ = db.command
  await db.collection('order').doc(event.orderid).update({
    data:{
      handler_id: _.set(wxContext.OPENID),
      recycled_time: new Date(),
      status: _.set(1),  // Completed
      earned_point: _.set(event.earned_point || 0),
      garbage_type: _.set(event.garbage_type || []),
    }
  }).then(res => {
    db.collection('order').doc(event.orderid).get().then(res => {
       // add earned_point
      db.collection('user').doc(res.data._userid).update({
        data: {
          point: _.inc(event.earned_point),
        }
      })
    })
  }).catch(err => {
    errCode = 1
    data = err
    errMsg = 'Database: Order handle Fail'
  })

  return { errCode: errCode, errMsg: errMsg, data: data }
}