import observe from './observe'
import Watcher from './Watcher'

let obj = {
  b: 5,
  a:{
    m:{
      n: {
        a:1
      },
      g: 1
    },
    n:{
      a:1
    }
  },
  c: [1,2]
}

// obj.b++
console.log(observe(obj))
// observe(obj.a.m.n)
// obj.c.push(77)
// console.log(obj.c)
// console.log(obj)
// let watchResult = new Watcher(obj, 'a.m.n', (val,val1,val2) => {
//   console.log('a.m.n', val,val1,val2)
// })
// new Watcher(obj, 'a.m', (val,val1,val2) => {
//   console.log('a.m', val,val1,val2)
// })
// new Watcher(obj, 'a.m.g', (val,val1) => {
//   console.log('a.m.g', val,val1)
// })
// new Watcher(obj, 'a.m.n.a', (val,val1) => {
//   console.log('a.m.n.a', val,val1)
// })
// new Watcher(obj, 'a.m.n.b', (val,val1) => {
//   console.log('a.m.n.b', val,val1)
// })
// new Watcher(obj, 'a.n.a', (val,val1) => {
//   console.log('a.n.a', val,val1)
// })
// // console.log('watchResult',watchResult)
// new Watcher(obj, 'b', (val,val1,val2) => {
//   console.log('我是b', val,val1,val2)
// })
// new Watcher(obj, 'c[1]', (val,val1,val2) => {
//   console.log('我是c', val,val1,val2)
// })
new Watcher(obj, 'a.m.n.a', (val,val1) => {
  console.log('a.m.n.a', val,val1)
})
obj.a.m.n.a ++
// obj.a.m.g ++
// obj.a.m.g ++
// obj.b ++
// obj.c[1]++
// obj.b ++
// obj.a.m =5
// obj.a = 5
console.log('obj',obj)

let container = document.getElementById('container')
let btn = document.getElementById('btn')
btn.onclick = function () {
  obj.a.m.n.a ++
}
let div = document.createElement('div')
let text = document.createTextNode(obj.a.m.n.a)
div.appendChild(text)
container.appendChild(div)