// 让tokens数组变为dom字符串
import lookup from './lookup'
import parseArray from './parseArray'
export default function renderTemplate(tokens, data) {
  console.log(tokens, data)
  let resultStr = ''
  // 遍历tokens
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token[0] === 'text') {
      // 拼起来
      resultStr += token[1]
    } else if(token[0] === 'name') {
      resultStr += lookup(data,[token[1]])
    } else if(token[0] === '#') {
      resultStr += parseArray(token, data)
    }
  }
  return resultStr
}