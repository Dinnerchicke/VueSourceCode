import vnode from './vnode'

// 调用的时候h('div', {}, ''/[]/[h()...])，三种参数

export default function (sel, data, c) {
  if (arguments.length !== 3) {
    throw new Error('只要3个参')
  }
  // 检查c的类型
  if (typeof c === 'string' || typeof c === 'number') { // 基本类型
    return vnode(sel,data,undefined,c,undefined)
  } else if (Array.isArray(c)) { // 数组
    // 遍历c
    let children = []
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('传入的数组参数中有项不是h函数')
      }
      children.push(c[i])
    }
    return vnode(sel,data,children,undefined,undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 传入的c是唯一的children
    let children = [c]
    return vnode(sel,data,children,undefined,undefined)
  } else {
    throw new Error('传入第三个参数类型不对')
  }
}