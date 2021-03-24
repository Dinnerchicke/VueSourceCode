
export default function (templateStr) {
  // 指针
  let index = 0
  // 剩余部分
  let rest = ''
  // 开始标记
  let startRegExp = /^\<([a-z]+[1-6]?)\>/;
  // 文字标签
  let wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/
  // 结束标签
  let endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
  // 准备两个栈
  let stack1 = []
  let stack2 = [{'children':[]}] // 防止最后把栈弹完

  while(index < templateStr.length - 1){
    // 剩余部分
    rest = templateStr.substring(index)
    // 识别遍历的字符是否是开始标签
    if (startRegExp.test(rest)) {
      let tag = rest.match(startRegExp)[1]
      // console.log('检测到开始标记',tag)
      // 将开始标记推入栈中
      stack1.push(tag)
      // 将对象推入栈中
      stack2.push({tag, children:[]})
      // 移动指针,包括<>两个符号
      index+=tag.length+2
    }else if (endRegExp.test(rest)) {
      let tag = rest.match(endRegExp)[1]
      console.log('检测到结束标记',tag)
      let popTag = stack1.pop()
      // 此时tag一定和栈1的顶部相同的
      if (tag === popTag) {
        let popArr = stack2.pop()
        // // 检查stack2是否有children属性
        // if (stack2[stack2.length-1].hasOwnProperty('children')) {
        //   stack2[stack2.length-1].children = []
        // }
        if (stack2.length>0) {
          stack2[stack2.length-1].children.push(popArr)
        }
      }else{
        throw new Error(popTag +'标签没有封闭')
      }
      index+=tag.length+3
    }else if (wordRegExp.test(rest)) {
      // 识别到文字，但不能是全空
      let word = rest.match(wordRegExp)[1]
      console.log('检测到文字'+word)
      if (!/^\s+$/.test(word)) {
        // 改变此时栈顶元素
        stack2[stack2.length-1].children.push({'test':word,'type':3})
      }
      index+=word.length
    }else{
      index++
    }
  }
  console.dir(stack2)
}