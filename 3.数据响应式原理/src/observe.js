import defineReactive from './defineReactive'
import Observer from './Observer'

export default function (value) {
  if (typeof value !== 'object') { // 函数只为对象服务
    return
  }
  
  // 单例模式
  let ob
  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__ // 不希望重名
  } else {
    ob = new Observer(value)
  }
  return ob
}