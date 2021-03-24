import createNewVnode from "./createNewVnode";
import updateChildren from './updateChildren'

export default function patchVnode(oldVnode, newVnode) {
  if (oldVnode === newVnode) { // 完全相同
    return
  }
  if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length ===0)) { // 有text且没有子节点
    console.log('新vnode有text属性')
    if (newVnode.text !== oldVnode.text) { // 新旧节点文字不同
      oldVnode.elm.innerText = newVnode.text // 直接写入即可，即使旧节点有children也会被覆盖
    }
  } else { // 新节点没有text属性
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 最复杂，新老都有children
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
      // console.log('最复杂，新老都有children')
      // let un = 0 // 指向oldVnode的指针，判断key是否相同
      // for (let i = 0; i < newVnode.children.length; i++) {
      //   let child = newVnode.children[i];
      //   let isExist = false
      //   for (let j = 0; j < oldVnode.children.length; j++) {
      //     if (oldVnode.children[j].sel === child.sel && oldVnode.children[j].key === child.key) {
      //       isExist = true
      //     }
      //     if (!isExist) {
      //       console.log('child',child)
      //       let dom = createNewVnode(child)
      //       child.elm = dom
      //       if (un < oldVnode.children.length) {
      //         oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm)
      //       } else {
      //         oldVnode.elm.appendChild(dom)
      //       }
      //     } else {
      //       un++
      //     }
      //   }
      // }
    } else {
      // 老的没有children，新的有
      // 清空老节点内容
      oldVnode.elm.innerHTML = ''
      // 创建子节点DOM上树
      for (let i = 0; i < newVnode.children.length; i++) {
        const newDom = createNewVnode(newVnode.children[i])
        oldVnode.elm.appendChild(newDom)
      }
    }
  }
}