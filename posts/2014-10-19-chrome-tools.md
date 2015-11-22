---
layout:     post
title:     Chrome开发者工具使用教程
date: 2014-10-19
description: 
---


###Elements

chrome devtools 中 Elements panel 是审查 dom 元素和 css 的, 可以实时修改 dom/css.

- windows: ctrl + shift + i
- mac: cmd + opt + i
<!-- more -->
###DOM

**修改 html & 属性**

节点右键, 如下图, 可以: 

![修改元素](http://gtms02.alicdn.com/tps/i2/TB1cHVlGFXXXXb.XXXXYkh.ZXXX-527-423.jpg)

- 添加属性(enter)
- 修改 html(F2)
- 删除元素(delete)

除了右键, 还可以:

- `h` toggle 元素的 visibility 属性
- 拖拽节点, 调整顺序
- 拖拽节点到编辑器

![查看元素](http://img3.tbcdn.cn/L1/461/1/6568776c7a3cb0bdf17cf3760c5a0b23221f5653)
- ctrl + z` 撤销修改

**查看元素上绑定了哪些事件**
![查看事件](http://img4.tbcdn.cn/L1/461/1/e2aacb4eb0fedb9002aeb89439f08944fefd636a)


- 默认会列出 All Nodes, 这些包括代理绑定在该节点的父/祖父节点上的事件, 因为在在冒泡或捕获阶段会经过该节点
- Selected Node Only 只会列出当前节点上绑定的事件
- 每个事件会有对应的几个属性 `handler`, `isAtribute`, `lineNumber`, `listenerBody`, `sourceName`, `type`, `useCapture`

`handle`

handler是处理函数, 右键可以看到这个函数定义的位置, 一般 js 库绑定事件会包一层, 所以这里很难找到对应handler

`isAtribute` 表明事件是否通过 html 属性(类似onClick)形式绑定的

`useCapture` 是 addEventListener 的第三个参数, 说明事件是以 冒泡 还是 捕获 顺序执行

**Styles**

修改样式

- 添加规则 
![](http://img2.tbcdn.cn/L1/461/1/47df15944c5aad071da619c02693f1f00e3efad2)
- 添加、修改属性 同样可以通过 ctrl + z 取消

###断点

**代码断点**

- 设置断点
 - 在 Sources 面板 js 文件行号处设置断点, 这里除了常规断点外, 还有个条件断点(右键 conditional breakpoint), 在设置的条件为 true 时才会断电, 在循环中需要断点时比较有用.
 - 断点后可以查看 堆栈, 变量 信息:
 - ![](http://img3.tbcdn.cn/L1/461/1/a178787031ff59a3eeb9c4b33cc59338353a4b43)

- 在调用堆栈这里可以切换到堆栈中的任何地方重新执行(右键restart frame), 如果想查看断点前的信息时比较有用.

- 断点后的变量保存到全局
 - 选中变量, 右键 Evalute in console
 - 在 console 中选中输出的内容, 右键 store as global variable

**事件断点**

**元素上事件断点**

`devtools` 可以查看某一个元素上绑定了哪些事件: `Elements` > `Event Listeners`
![](http://img1.tbcdn.cn/L1/461/1/25f7737f9f88b5b921ecbb0a7eb0cdf9726ac880)

**dom mutation 断点(推荐)**

`dom mutation event` 是 DOM3 添加的新的事件, 一般是 dom 结构改变时触发. `devtools` 可以对 `DOMSubtreeModified` `DOMAttrModified` 和 `DOMNodeRemoved` 时断点. 对上面 元素上事件断点(`mouseover`) 后不容易找到业务代码, 使用 mutation 断点, 断点后配合 `call stack` 就可以找到业务代码了, 如下图

![](http://img2.tbcdn.cn/L1/461/1/14811e0e62a2ecb31c5875ac7186f4caa9e6ccfa)

 这种情况使用全局搜索(ctrl + shift + f) 代码中 css classname 也能找到业务代码, 然后直接断点也可以.

**全局事件断点**

devtools 还可以对事件发生时断点, 比如 click 发生时断点, 这个跟 元素上事件断点 不同, 不会限定在元素上, 只要是事件发生, 并且有 handler 就断点; 还可以对 resize, ajax, setTimeout/setInterval 断点.

下面这个图是 resize 时中断, 因为库都代理了, 还需要在断点处一步一步跟下去才能走到业务代码中. 
![](http://img1.tbcdn.cn/L1/461/1/6fe5a3d32743e8402343062a5ceebdc408cbe511)

**几个常用的断点快捷键:**

- F8: 继续执行
- F10: step over, 单步执行, 不进入函数
- F11: step into, 单步执行, 进入函数
- shift + F11: step out, 跳出函数
- ctrl + o: 打开文件
- ctrl + shit + o: 跳到函数定义位置
- ctrl + shift + f: 所有脚本中搜索

###Console

**元素选择**

**$(selector)**

即使当前页面没有加载jQuery，你也依然可以使用$和$$函数来选取元素，实际上，这两个函数只是对document.querySelector()和document.querySelectorAll()的简单封装，$用于选取单个元素，$$则用于选取多个： 
![](http://gtms01.alicdn.com/tps/i1/TB1l6KZFVXXXXc4aXXXYCer4FXX-1190-203.png)

**$_**

使用 `$_` 来引用最近的一个表达式 
![](http://gtms01.alicdn.com/tps/i1/TB1D2mQFVXXXXc_XFXX0zJfZVXX-394-121.png)

**$0 - $4**

除了`$_`，你还可以使用`$0`,`$1`,`$2`,`$3`,`$4`这5个变量来引用最近选取过的5个DOM元素。 $0 为Elements HTML 面板中选中的元素。 $1 为上一次在 HTML 面板中选中的元素。 $2、$3、$4 同样的。不过只能到$4

**copy**

复制到剪切板，copy之后，直接ctrl+v 
![](http://gtms02.alicdn.com/tps/i2/TB1iSq5FVXXXXXGaXXXJJvZJFXX-920-127.png)

**信息输出**

在js代码中打点``console.log()` 类似debugger

转自网络


