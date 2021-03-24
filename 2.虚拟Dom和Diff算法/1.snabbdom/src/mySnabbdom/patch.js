import vnode from './vnode'
import createNewVnode from './createNewVnode'
import patchVnode from './patchVnode'

export default function (oldVnode, newVnode) {

  console.log(oldVnode)
  console.log(newVnode)

  // 判断传入的oldVnode是DOM节点还是虚拟节点
  if (oldVnode.sel == '' || oldVnode.sel === undefined) { // 假如传入的DOM是容器DOM
    // 包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  
  // 判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    patchVnode(oldVnode,newVnode)
  } else {
    // 删除老节点，创建新节点，插入到老节点之前
    let newVnodeElm = createNewVnode(newVnode)
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}