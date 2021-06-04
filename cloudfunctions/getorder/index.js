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
  var whereObj = {};

  const _ = db.command
  if (event.status != null) {
    whereObj.status = _.eq(event.status)
  }
  if (event._userid != null) {
    // Object.assign(whereObj, {_userid: _.eq(event._userid)})
    whereObj._userid = _.eq(event._userid)
  }
  
  // TODO: Query all orders in btaches
  // REFFEREMCE: https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/read.html
  await db.collection('order').where(whereObj).get().then(res => {
    data = res.data
  }).catch(err => {
    errCode = 1
    data = err
    errMsg = 'Database: Order Query Fail'
  })

  return data
}