import observe from './observe'
import Watcher from './Watcher'

export default class Compile {
  constructor(el, vue) {
    // vue实例
    this.$vue = vue
    // 挂载点
    this.$el = document.querySelector(el)
    if (this.$el) {
      // fragments就是模板引擎的tokens，实际上用的是AST
      let $fragment = this.node2Fragment(this.$el) // 让节点变为fragment
      // 编译模板
      this.compile($fragment)
      // 替换好的内容上树
      this.$el.appendChild($fragment)
    }
  }
  node2Fragment(el) {
    let fragment = document.createDocumentFragment()
    let child = el.firstChild
    // 让所有DOM节点都进入fragment
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  }
  compile(el) {
    // 得到子元素
    let childNodes = el.childNodes
    let self = this

    let reg = /\{\{(.*)\}\}/;

    childNodes.forEach(node => {
      let text = node.textContent
      if (node.nodeType == 1) { // 元素节点
        self.compileElement(node)
      } else if (node.nodeType == 3 && reg.test(text)) { //文本节点
        let name = text.match(reg)[1]
        self.compileText(node, name)
      }
    })
  }
  // 编译元素
  compileElement(node) {

    // 获取元素属性
    let nodeAttributes = node.attributes
    // console.log('nodeAttributes',nodeAttributes)

    let self = this

    // 类数组对象转换为数组，该方法实现有各种漏洞，这里只是简单实现
    Array.prototype.slice.call(nodeAttributes).forEach(attributes => {
      // 分析指令
      let attributesName = attributes.name
      let value = attributes.value

      // 指令都是v-开头的
      let dir = attributesName.substring(2)
      // console.log(dir)

      // 看看是否是指令
      if (attributesName.indexOf('v-') == 0) {
        // v-开头是指令
        if (dir === 'model') {
          new Watcher(self.$vue, value, value=>{
            node.value = value
          })
          let v = self.getVueValue(self.$vue, value)
          node.value = v

          node.addEventListener('input', e=>{
            let newValue = e.target.value

            self.setVueValue(self.$vue, value, newValue)
            v = newValue
          })
        } else if (dir === 'if'){

        }
      }
    })
  }
  compileText(node, name){
    // console.log(node,name)
    node.textContent = this.getVueValue(this.$vue, name)
    new Watcher(this.$vue, name, value => {
      node.textContent = value
    })
  }
  getVueValue(vue, exp){
    let val = vue
    exp = exp.split('.')
    exp.forEach(key => {
      val = val[key]
    })
    return val
  }
  setVueValue(vue, expression, value){
    let val = vue
    expression = expression.split('.')
    expression.forEach((key,i) => {
      if (i< expression.length -1) {
        val = val[key]
      } else {
        val[key] = value
      }
    })
  }
}