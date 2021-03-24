import {def} from './util'

// 改写数组的七个方法
const arrayPrototype = Array.prototype

// 以Array.prototype为原型创建arrayMethods对象
export const arrayMethods = Object.create(arrayPrototype)


const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsNeedChange.forEach(methodName => {
  // 备份方法
  const original = arrayPrototype[methodName]
  // 定义新方法
  def(arrayMethods,methodName, function () {
    // 恢复原来的功能
    const result = original.apply(this, arguments)
    // 把类数组对象变成数组
    const args = [...arguments]
    // 把__ob__取出来
    const ob = this.__ob__
    // push/unshift/splice三种方法插入新项，新项也要变成observe的
    let inserted = []
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break;
    }
    // 判断有没有要插入的新项,将其也变成响应式
    if (inserted) {
      ob.observeArray(inserted)
    }
    console.log(arguments)
    ob.dep.notify()
    return result
  },false)
})