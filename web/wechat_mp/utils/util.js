const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const objToQueryString = (obj) => {
  let str = "";
  for (let i in obj) {
    str = str + i + "=" + obj[i] + "&";
  }
  return str.substr(0, str.length - 1);
}
const objNullCheck =(obj) =>{
  let checkFlag = true; 
  for (let i in obj) {
    if(obj[i]==null||obj[i]==undefined){
      checkFlag = false;
      break;
    }
  }
  return checkFlag;
}
module.exports = {
  formatTime: formatTime,
  objToQueryString,
  objNullCheck
}
