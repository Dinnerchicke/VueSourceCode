import Compile from './Compile'
import observe from './observe'
import Watcher from './Watcher'

export default class Vue{
  constructor(options){
    // 把参数options存为$options
    this.$options = options || {}
    // 数据
    this._data = options.data || undefined
    // 观测数据
    observe(this._data)
    // 默认数据变为响应式，这里就是生命周期
    this._initData()
    // this._initComputed()
    this._initWatch()
    // 调用默认的watch
    // 模板编译
    new Compile(options.el, this)
    // 生命周期比如created，直接调用传入的options.created()
  }
  _initData(){
    let self = this
    Object.keys(this._data).forEach(key =>{
      Object.defineProperty(self, key, {
        get(){
          return self._data[key]
        },
        set(newValue){
          self._data[key] = newValue
        }
      })
    })
  }
  _initComputed(){

  }
  _initWatch(){
    let self = this
    let watch = this.$options.watch
    Object.keys(watch).forEach(key => {
      new Watcher(self, key, watch[key])
    })
  }
}