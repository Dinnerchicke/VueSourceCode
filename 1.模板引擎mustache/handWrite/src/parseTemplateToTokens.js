import Scanner from './Scanner'
import nestTokens from './nestTokens'
// 将模板字符串变为tokens数组
export default function parseTemplateToTokens() {
  let tokens = []
  // 创建扫描器
  let scanner = new Scanner(templateStr)
  let words
  while(!scanner.eos()){
    // 收集开始标记之前的文字
    words = scanner.scanUntil('{{')
    // console.log('words',words)
    // 存起来
    tokens.push(['text',words.replace(/\s/g,' ')])
    // 过双大括号
    scanner.scan('{{')
    // 收集开始标记出现之前的文字
    words = scanner.scanUntil('}}')
    if (words !== '') {
      if (words[0] === '#') {
        // 从下标为1开始存
        tokens.push(['#', words.substring(1)])
      } else if(words[0] == '/') {
        tokens.push(['/', words.substring(1)])
      } else {
        tokens.push(['name', words])
      }
    }
    // 过双大括号
    scanner.scan('}}')
  }

  return nestTokens(tokens)
}