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
  if (event.type != null) {
    whereObj.type = _.eq(event.type)
  }
  if (event._userid != null) {
    whereObj._userid = _.eq(event._userid)
  }
  if (event.title != null) {
    whereObj.title = _.eq(event.title)
  }
  
  // TODO: Query all orders in btaches
  // REFFEREMCE: https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/read.html
  await db.collection('feedback').where(whereObj).get().then(res => {
    data = res.data
  }).catch(err => {
    errCode = 1
    data = err
    errMsg = 'Database: Feedback Query Fail'
  })

  return data
}