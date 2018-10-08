export const httpGet = (url,callback) => {
  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json'
    },
    method : "GET",
    success:  (res) =>{
      callback(null,res)
    },
    fail :(err)=>{
      callback(err,null)
    }
  })
}
export const httpPost = (url, params) => {
  //console.log(httpHeaders.headers);
  return fetch('http://' + url, {
    method: 'POST',
    body: JSON.stringify(params)
  }).then((response) => {
    let json = response.json()
    return json;
  })
}
export const httpPut = (url, params) => {
  //console.log(httpHeaders.headers);
  return fetch('http://' + url, {
    method: 'PUT',
    body: JSON.stringify(params)
  }).then((response) => {
    let json = response.json()
    return json;
  })
}
export const httpDel = (url) => {
  return fetch('http://' + url, {
    method: 'DELETE'
  }).then((response) => {
    let json = response.json()
    return json
  })
}