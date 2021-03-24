// 折叠Tokens,将#和/之间的tokens折叠起来
export default function nestTokens(tokens) {
  // 结果
  let nestTokens = []
  // 栈结构
  let sections = []
  // 收集器, 指向tokens数组
  let collector = nestTokens

  for (let i = 0;i< tokens.length; i++){
    let token = tokens[i]
    
    switch (token[0]) {
      case '#':
        // 收集器中放入token
        collector.push(token)
        sections.push(token)
        // 收集器要换下一层
        collector = token[2] = []
        break
      case '/':
        // 出栈
        let section_pop = sections.pop()
        // 改变收集器,变为上一层,先判断是否有东西，如果没有说明已经到了顶层了
        collector = sections.length > 0 ? sections[sections.length-1][2] : nestTokens
        break
      default:
        collector.push(token)
    }
  }
  return nestTokens
}