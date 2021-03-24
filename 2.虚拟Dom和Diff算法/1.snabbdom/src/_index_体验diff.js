import { init } from 'snabbdom/init';
import { classModule } from 'snabbdom/modules/class';
import { propsModule } from 'snabbdom/modules/props';
import { styleModule } from 'snabbdom/modules/style';
import { eventListenersModule } from 'snabbdom/modules/eventlisteners';
import { h } from 'snabbdom/h';

// 创建patch函数
const patch = init([classModule,propsModule,styleModule,eventListenersModule])

// 获取元素
const btn = document.getElementById('btn')
const container = document.getElementById('container')

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
  // 如上所示，如果不加key的话，在前面添加新节点，diff算法会把该节点的所有兄弟节点更新，开销很大
  // 所以需要给节点添加key值作为唯一标识，避免把所有兄弟节点更新，节省开销
  patch(myVnode1,myVnode2)
}