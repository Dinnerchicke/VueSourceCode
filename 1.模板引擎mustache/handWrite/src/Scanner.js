// 扫描器类
export default class Scanner {
  constructor(templateStr) {
    console.log(templateStr)
    this.templateStr = templateStr
    // 指针
    this.pos = 0
    // 要扫描的区域，一开始就是模板字符串原文
    this.tail = templateStr
  }

  // 功能弱，就是走过指定内容如{{}},没有返回值
  scan(tag) {
    if (this.tail.indexOf(tag) == 0) {
      // tag有多长，就让指针后移多少位，比如{{是两位
      this.pos += tag.length
      // 尾巴也要变
      this.tail = this.templateStr.substring(this.pos)
    }
  }

  // 让指针进行扫描，直到遇到指定内容结束，并且返回结束之前路过的文字
  scanUntil(stopTag) {
    // 记录开始的时候pos的值
    const pos_backup = this.pos
    // 当尾巴的开头不是不是stopTag, &&防止死循环
    while(this.tail.indexOf(stopTag) !== 0 && !this.eos()){
      this.pos++
      // 尾巴从当前指针字符开始到最后
      this.tail = this.templateStr.substr(this.pos)
    }
    return this.templateStr.substring(pos_backup, this.pos)
  }

  // 判断指针是否到头
  eos() {
    return this.pos >= this.templateStr.length;
  }
}