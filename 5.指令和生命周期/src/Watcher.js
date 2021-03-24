import Dep from "./Dep"

let uid = 0
export default class Watcher {
  // 监听哪个对象(target),对象的表达式如a.b.c(expression),触发的回调(callback)
  constructor(target, expression, callback){
    // console.log('我是watcher类的构造器')
    this.id = uid++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }
  // 每次更新会调用该函数
  update(){
    this.run()
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  // 保存旧值输出新值调用回调
  getAndInvoke(cb){
    // 获取值
    const value = this.get()

    // 值发生变化调用回调函数
    if (value !== this.value || typeof value === 'object') {
      const oldValue = this.value
      this.value = value
      // console.log('this.target',this.target)
      // console.log('value',value)
      // console.log('oldValue',oldValue)
      // console.log('cb',cb)
      cb.call(this.target, value, oldValue)
    }
  }
  get(){
    // 依赖收集阶段,让全局的Dep.target设置为Watcher本身
    Dep.target = this
    // console.log('Dep.target',Dep.target)

    const obj = this.target

    let value

    // 只要能找就一直找
    try {
      // this.getter === parsePath()
      value = this.getter(obj)
    } finally {
      // 全局重新设置为null
      Dep.target = null
    }
    return value
  }
}

// 用字符串如a.m.n获取真实对象a子属性的值
function parsePath(str) {
  let segments = str.split('.')

  return (obj) => {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) {
        return
      }
      obj = obj[segments[i]]
    }
    return obj
  }
}