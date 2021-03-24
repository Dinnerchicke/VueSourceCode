// 真正创建节点，将vnode创建为DOM，但是是孤儿节点不进行插入
export default function createNewVnode(vnode) {

  // 创建新节点
  let domNode = document.createElement(vnode.sel)

  // 判断是父节点还是文本节点
  if(vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) { // 假如为文本节点
    // 将内部文字插入到domNode上
    domNode.innerText = vnode.text
    // // 将孤儿节点上树。让标杆节点的父元素调用insertBefore方法，将新的孤儿节点插入到标签节点之前
    // pivot.parentNode.insertBefore(domNode,pivot)
  } else if(Array.isArray(vnode.children) && vnode.children.length > 0) { // 假如是父节点子节点不为空
    // 内部是子节点,递归创建子节点
    for (let i = 0; i < vnode.children.length; i++) {
      let ch = vnode.children[i];
      let chDOM = createNewVnode(ch)
      domNode.appendChild(chDOM)
    }
  }
  vnode.elm = domNode
  return vnode.elm
}