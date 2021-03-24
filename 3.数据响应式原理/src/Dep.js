let uid = 0
// 每个父节点都有__ob__,保存自己和所有子节点的watcher
export default class Dep {
  constructor(){
    // console.log('我是dep类的构造器')
    this.id = uid++
    // 存储订阅者,即watcher的实例
    this.subs = []
  }
  // 添加订阅
  addSub(sub) {
    // 假如watcher存在，则覆盖它
    for (let i = 0; i < this.subs.length; i++) {
      if (this.subs[i].id === sub.id) {
        this.subs[i] = sub
        return
      }
    }
    this.subs.push(sub)
  }
  // 添加依赖
  depend(){
    // Dep.target就是一个我们自己指定的全局位置，单例模式
    if (Dep.target) {
      // console.log('Dep.target',Dep.target)
      this.addSub(Dep.target)
      // console.log(this.subs)
    }
  }
  // 通知更新
  notify(){
    // console.log('我是notify')
    // // 浅拷贝一份
    // const subs = this.subs.slice()
    // 遍历
    for (let i = 0; i < this.subs.length; i++) {
      this.subs[i].update()
    }
  }
}