const reqUtil = require('../utils/ReqUtil.js')
const config = require('../config.js')
export const getCity = (callback)=>{
   reqUtil.httpGet(config.host.apiHost+"/city",(err,res)=>{
     callback(err,res)
   })
}
