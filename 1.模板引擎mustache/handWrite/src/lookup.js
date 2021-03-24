// 可以在dataObj对象中，寻找连续点符号的keyName属性比如a.b.c
export default function lookup(dataObj, keyName){
  // console.log(dataObj,keyName)
  if (keyName.indexOf('.') !== -1 && keyName != '.') {
    let keys = keyName.split('.')
    var tmp = dataObj
    console.log('dataObj',dataObj)
    for (let i = 0; i < keys.length; i++) {
      // 一层一层
      tmp = tmp[keys[i]]
    }
    return tmp
  } 
  return dataObj[keyName]
}