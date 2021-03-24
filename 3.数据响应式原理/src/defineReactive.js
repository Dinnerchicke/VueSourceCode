import Dep from './Dep'
import observe from './observe'
// import Dep from './Dep'

// 闭包封装Object.defineProperty
export default function defineReactive(data, key, val) {
  const dep = new Dep()
  // console.log('defineReactive', key)
  // console.log(arguments.length === 2)
  if (arguments.length === 2) {
    val = data[key]
    // console.log('data',data)
    // console.log('key',key)
    // console.log('val',val)
  }

  // 子元素observe，递归
  let childOb = observe(val)

  Object.defineProperty(data, key, {
    // 可枚举
    enumerable: true,
    // 可配置
    configurable: true,

    get() {
      // console.log('正在访问'+key+'属性')
      // 如果处于依赖收集阶段
      // 如果是对象则给整个对象添加依赖函数
      if (Dep.target) {
        // console.log('Dep.target',Dep.target)
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set(newValue) {
      // console.log('正在改变'+key+'属性', newValue)
      if (val === newValue) {
        return
      }
      val = newValue
      // 当设置了新值，新值也要被observe,防止新值也是个对象
      childOb = observe(newValue)
      // 发布订阅模式，通知dep进行改变
      dep.notify()
    }
  })
}