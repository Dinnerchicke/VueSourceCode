import { init } from 'snabbdom/init';
import { classModule } from 'snabbdom/modules/class';
import { propsModule } from 'snabbdom/modules/props';
import { styleModule } from 'snabbdom/modules/style';
import { eventListenersModule } from 'snabbdom/modules/eventlisteners';
import { h } from 'snabbdom/h';

// 创建patch函数
const patch = init([classModule,propsModule,styleModule,eventListenersModule])

// 创建虚拟节点
var myVnode1 = h('div', 
{props: 
  {style:
    {
      backgroundcolor: '#fff'
    }
  }
}, 'Vnode')
console.log(myVnode1)

var myVnode1 = h(
  'div',
  {},
  '我是一个盒子'
)

var myVnode1 = h(
  'ul',
  [
    h('li', 'Apple'),
    h('li', 'xiaomi')
  ]
)

// 让虚拟节点上树
const container = document.getElementById('container')
patch(container, myVnode1)