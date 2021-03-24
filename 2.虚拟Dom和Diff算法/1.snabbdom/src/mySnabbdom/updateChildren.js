import patchVnode from './patchVnode'
import createNewVnode from './createNewVnode'

function checkSameVnode(a,b) {
  return a.sel === b.sel && a.key === b.key
}

export default function updateChildren(parentElm, oldChild, newChild) {
  // 旧前
  let oldStartIdx = 0
  // 新前
  let newStartIdx = 0
  // 旧后
  let oldEndIdx = oldChild.length-1
  // 新后
  let newEndIdx = newChild.length-1
  // 旧前节点
  let oldStartVnode = oldChild[0]
  // 旧后节点
  let oldEndVnode = oldChild[oldEndIdx]
  // 旧前节点
  let newStartVnode = newChild[0]
  // 旧后节点
  let newEndVnode = newChild[newEndIdx]

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 新前和旧前
    if (checkSameVnode(oldStartVnode, newStartVnode)) { // 对比两个节点是否相同
      console.log('新前和旧前命中')
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldChild[++oldStartIdx]
      newStartVnode = newChild[++newStartIdx]
    } else if(checkSameVnode(oldEndVnode, newEndVnode)) {
      // 新后和旧后
      console.log('新后和旧后命中')
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldChild[--oldEndIdx]
      newEndVnode = newChild[--newEndIdx]
    } else if(checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新后和旧前
      console.log('新后和旧前命中')
      patchVnode(oldStartVnode, newEndVnode)
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldChild[++oldStartIdx]
      newEndVnode = newChild[--newEndIdx]
    } else if(checkSameVnode(oldEndVnode, newStartVnode)) {
      // 新前和旧后
      console.log('新前和旧后命中')
      patchVnode(oldEndVnode, newStartVnode)
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm.nextSibling)
      oldEndVnode = oldChild[--oldEndIdx]
      newStartVnode = newChild[++newStartIdx]
    }
  }
}