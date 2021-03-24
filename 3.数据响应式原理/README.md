#  数据响应式原理

> 数据变化，视图也跟着改变
>
> MVVM：model(数据模型)—view-model(视图模型)—view(视图)
>
> Object.defineProperty():数据劫持/数据代理，检测对象属性变化



![](pic/dataResponse.png)



## Object.defineProperty()

> 此方法会直接在一个对象上定义一个新属性，或修改对象的属性，返回此对象

> Tips：
>
> 1. value和set()不能同时存在
> 2. 使用此函数的原因是其可以为obj的属性设置属性，比如可/不可枚举等
> 3. get()和set()需要变量中转才能互相获取



### 封装

> 封装后更易使用，用闭包替代临时变量

```js
// 闭包封装Object.defineProperty
function defineReactive(data, key, val) {
  Object.defineProperty(data, key, {
    // 可枚举
    enumerable: true,
    // 可配置
    configurable: true,

    get() {
      return val
    },
    set(newValue) {
      if (val === newValue) {
        return
      }
      val = newValue
    }
  })
}
```



## 数组响应式

> 在vue，关于数组的以下方法被改写：
>
> 1. push
> 2. pop
> 3. shift
> 4. unshift
> 5. splice
> 6. sort
> 7. reverse



## 收集依赖

> vue1.x，细粒度依赖，用到数据的DOM都是依赖
>
> vue2.x，中等粒度依赖，用到数据的***组件***是依赖
>
> 在*getter*中*收集依赖*，在*setter*中*触发依赖*

