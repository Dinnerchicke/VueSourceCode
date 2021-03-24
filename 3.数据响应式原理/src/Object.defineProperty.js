let obj = {}

// 中转get/set
let tmp

// 为什么要用Object.defineProperty，因为可以设置隐藏属性如writeable
Object.defineProperty(obj, 'a', {
  // value: 3,

  get(){ // 数据劫持
    console.log('正在访问obj的a属性')
    return tmp
  },
  set(newValue){
    console.log('正在改变obj的a属性',newValue)
    tmp = newValue
  }
})

Object.defineProperty(obj, 'b', {
  value: 5,
})

obj.a = 66
console.log(obj.a)
