import h from './mySnabbdom/h.js'
import vnode from './mySnabbdom/vnode'
import patch from './mySnabbdom/patch'

// 容器
const container = document.getElementById('container')
const btn = document.getElementById('btn')

// 单元测试：vnode
// 作用：输入参数，输出标准格式的vnode，但是无法根据参数类型输出对应格式的vnode
// 参数：sel(选择器), data(属性), children(子节点), text(innerText), elm(对应DOM元素)
let myVnodeTest1 = vnode('div', {}, 'vnode')
console.log('myVnodeTest1',myVnodeTest1)

console.log('----------------------')

// 单元测试：h
// 作用：输入对应三种参数，根据第三个参数的类型智能决定输出vnode的格式
let myHTest1 = h('div',{key:'A'},'文字')
let myHTest2 = h('div',{key:'B'},[
  h('div',{key:'A'},[
    h('div',{key:'B'},'xiaomi'),
    h('div',{key:'C'},'sanxing'),
  ]),
  h('div',{key:'B'},'xiaomi'),
  h('div',{key:'C'},'sanxing'),
])
console.log('myHTest1',myHTest1)
console.log('myHTest2',myHTest2)

console.log('----------------------')

// 单元测试：patch
// 作用：输入新旧虚拟DOM，比较新旧DOM，让新节点上树
let myPatchTest1 = h('section',{},'文字A')
let myPatchTest2 = h('section',{key:'B'},[
  h('div',{key:'A'},[
    h('div',{key:'B'},'xiaomi'),
    h('div',{key:'C'},'sanxing'),
  ]),
  h('div',{key:'B'},'xiaomi'),
  h('div',{key:'C'},'sanxing'),
])
let myPatchTest3 = h('section',{},[
  h('div',{key:'A'},'apple'),
  h('div',{key:'B'},'xiaomi'),
  h('div',{key:'C'},'sanxing'),
])
let myPatchTest4 = h('section',{},[
  h('div',{key:'A'},[
    h('div',{key:'M'},'xiaomi'),
    h('div',{key:'N'},'sanxing'),
  ]),
  h('div',{key:'B'},'xiaomi'),
  h('div',{key:'C'},'sanxing'),
])
patch(container,myPatchTest3)
btn.onclick = function () {
  patch(myPatchTest3,myPatchTest4)
}




// 

// 添加和更新
// 
