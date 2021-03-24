import Scanner from './Scanner'
import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from './renderTemplate'
window.myMustache = {
  // 渲染
  render(templateStr, data) {
    // Scanner单元测试
    // let scanner = new Scanner(templateStr)
    // while(scanner.pos != templateStr.length) {
    //   let word1 = scanner.scanUntil('{{')
    //   console.log(word1)
    //   scanner.scan('{{')

    //   let word2 = scanner.scanUntil('}}')
    //   console.log(word2)
    //   scanner.scan('}}')
    // }

    // 让模板字符串变为tokens数组
    let tokens = parseTemplateToTokens(templateStr)
    // 让tokens数组变为dom字符串
    let domStr = renderTemplate(tokens, data)
    return domStr
  }
}