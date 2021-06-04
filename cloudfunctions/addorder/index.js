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
    return { errCode: 2, errMsg: 'Invalid field', data: data }
  }

  // time
  // db.serverDate() has bug, cannt use the function getHours()
  // TODO: check the stored date is whether server time
  const created_time = new Date()
  var expected_time;
  const _t = created_time;

  if (_t.getHours() < 11) {  // Collect garbage at 11
    expected_time = new Date(_t.getFullYear(), _t.getMonth(), _t.getDate(), 11, 0, 0, 0)
  } else if (created_time.getHours() < 16) { // Collect garbage at 16
    expected_time = new Date(_t.getFullYear(), _t.getMonth(), _t.getDate(), 16, 0, 0, 0)
  } else {  // Collect garbage at 11 tommorow
    expected_time = new Date(_t.getFullYear(), _t.getMonth(), _t.getDate() + 1, 11, 0, 0, 0)
  }

  await db.collection('order').add({
    data: {
      _userid: wxContext.OPENID,
      handler_id: null,
      address_id: event.addressid,
      created_time: created_time,
      recycled_time: null,
      expected_time: expected_time,
      status: 0,
      earned_point: 0,
      garbage_type: [],
    }
  }).catch(err => {
    errCode = 1
    data = err
    errMsg = 'Database: Order Add Fail'
  })

  return { errCode: errCode, errMsg: errMsg, data: data }
}