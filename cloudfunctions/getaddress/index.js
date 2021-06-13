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

  if (event.addressid != null) {
    // Object.assign(whereObj, {_userid: _.eq(event._userid)})
    whereObj._id = _.eq(event.addressid)
  }
  
  await db.collection('address').where(whereObj).get().then(res => {
    data = res.data
  }).catch(err => {
    errCode = 1
    data = err
    errMsg = 'Database: Address Query Fail'
  })

  return data
}