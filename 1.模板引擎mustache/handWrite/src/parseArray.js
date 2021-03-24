import lookup from "./lookup"
import renderTemplate from "./renderTemplate"

// 处理数组，结合renderTemplate实现递归
export default function parseArray(token, data) {
  console.log(token,data)
  let v = lookup(data, token[1])
  let resultStr = ''
  for (let i = 0; i < v.length; i++) {
    resultStr += renderTemplate(token[2], {
      ...v[i],
      '.': v[i]
    })
  }
  return resultStr
}