# 虚拟DOM和Diff算法

> 虚拟DOM：把DOM转化为Js对象
>
> diff：最小量更新算法。将新虚拟DOM和老虚拟DOM进行比较，更新。
>
> snabbdom：snabbdom是著名虚拟DOM库，是diff算法的鼻祖，Vue源码借鉴了snabbdom



## snabbdom

> h函数用来产生虚拟节点(vnode)

```js
// 虚拟节点的属性
{
    children: undefind, // 子节点
    data: {}, // 属性、样式等
    elm: undefind, // 对应真正的DOM节点
    key: undefind, // 该节点的唯一标识
    sel: 'div', // 标签名
    text: '我是div' // 标签内容
}
```



> 输入参数：oldVnode和newVnode

![](0.pic/patch.png)



> key的用处

```js
// 创建虚拟节点
var myVnode1 = h(
  'ul',
  {},
  [
    h('li', 'Apple'),
    h('li', 'xiaomi')
  ]
)

var myVnode2 = h(
  'ul',
  {},
  [
    h('li', 'sanxing'),
    h('li', 'Apple'),
    h('li', 'xiaomi'),
  ]
)

// 让虚拟节点上树
patch(container, myVnode1)

// 点击按钮vnode1变为vnode2
btn.onclick = function () {
  // 如上所示，如果不加key的话，在前面添加新节点，diff算法会把该节点后面的所有兄弟节点更新，开销很大
  // 所以需要给节点添加key值作为唯一标识，避免把所有兄弟节点更新，节省开销
  patch(myVnode1,myVnode2)
}
```



## Diff

> diff算法Tips：
>
> 1. `key值很重要`，key值将diff前后的节点唯一标识，避免重复渲染
> 2. 只有是`同一个虚拟节点`(选择器(如ol、ul等)和key相同)，才进行diff，不然直接回流。
> 3. 只进行`同层比较`，如果多了一层，节点内容相同，也是不会diff，还是会回流。



> diff的四指针四命中寻找子节点方法

![](0.pic/diff.png)