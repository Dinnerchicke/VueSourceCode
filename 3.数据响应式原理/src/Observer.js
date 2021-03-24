import {def} from './util'
import defineReactive from './defineReactive'
import {arrayMethods} from './array'
import observe from './observe'
import Dep from './Dep'

// 将正常的object转换为每个层级都是响应式的
export default class Observer{
  constructor(value){
    // 每个Observer实例都有一个Dep实例
    this.dep = new Dep()
    // 给value添加__ob__属性，值是new的实例
    def(value, '__ob__', this, false)
    // console.log('value',value)
    if (Array.isArray(value)) { // 数组
      // 如果是数组，将数组的原型指向arrayMethods
      Object.setPrototypeOf(value, arrayMethods)
      this.observeArray(value)
    }else{ // 对象
      this.walk(value)
    }
  }
  walk(value){
    for(let i in value) {
      defineReactive(value, i)
    }
  }
  observeArray(arr){
    for (let i = 0, l = arr.length; i < l; i++) {
      // 逐项进行observe
      observe(arr[i]);
    }
  }
}