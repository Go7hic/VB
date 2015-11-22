---
layout:     post
title:      js高手的六个秘密
date: 2014-05-08
description: 
---

## js高手的六个秘密


作为一个前端开发者，我遇见过很多使用Javascript的人。他们其中的大多数每天所做的事情仅仅是使用jQuery和一些插件为网页增加一个很酷的灯箱效果或者一个图片滑动效果。在光谱的对面，则是那些挥舞着键盘编写自己代码的绝地武士级别的开发者。

当你处于这两种级别之间时，你可能不清楚如何前进。成为专家的道路有很多，但是如果你陷入了迷茫失去了前进的动力，那么这里有几个Javascript专家应该了解的概念：
<!-- more -->
**Javascript秘密之一：闭包**

Javascript的闭包允许一个函数进入它的父作用域。这个概念另很多开发者都感到很疑惑。当我开始学习Javascript时，我花了很长时间来调试那些出现意想不到的闭包的代码。我从给这些错误中学到的是闭包非常非常酷，因此我花费了好几个小时来徒劳的使用闭包解决我的问题。

我渐渐的意识到：当你返回一个内部函数（注意阅读后面提到的高阶函数）时，它依然能够进入它的父作用域，此时闭包非常有用。闭包创建一系列私有或者受保护的环境来保持变量。

// **闭包**

function makeThreeTimer(){

var count = 0;

return function(){

if(count < 3){

console.log('doing work');

count++;

}

else {

throw new Error('No more work');

}

}

}

var threeTimer = makeThreeTimer();

threeTimer(); // 输出 'doing work' (count 增加了)
threeTimer(); // 输出 'doing work' (count 增加了)

threeTimer(); // 输出 'doing work' (count 增加了)
threeTimer(); // 抛出一个错误

threeTimer.count; // 返回 undefined    
在上米你的例子中，放threeTimer被调用时count被获取并增加，但是它并不能被点标示符或者方括号标示符所获取。

**Javascript秘密之二：高阶函数**

在函数式编程语言中，函数是第一类成员。它们能像其它值一样被传递，这个特性为编程增加了许多有趣的可能性。

高阶函数是指那些产生或者消耗其它函数的函数。function原型中的call和bind方法，都是高阶函数。一些技巧例如柯里化以及memoization都可以用高阶函数来表达。Javascript可以使用高阶函数来实现面向方向编程。

**Javascript秘密之三：调用函数**

在理解了调用函数的大多数方法之后（使用括号操作符），是时候来学习如何使用call和apply了。使用call/apply而不是括号操作符的好处在于你可以指定函数执行的上下文（this的值）。在告诫函数中你经常可以见到this，尤其是当接受一个函数并执行它是。Function原型中干的bind方法的内部实现就是一个call/apply的好例子：

// 使用apply去实现bind方法的可能情形

function bind(func, context){

return function(){

func.apply(context, Array.prototype.slice.apply(arguments));

}

}


**Javascript秘密之四：什么是this？**

this关键字是许多Javascript开发者遇到的最大的障碍，因此他们尽量避免使用它。到目前为止我看到的关于这一点的最好的解释来自Yehuda Katz博客中关于函数调用的文章。当我们不使用call/apply或者bind时，this值总是指向全局对象，除了下面的情形：

1.函数被new操作符调用，此时this指向被构建的新对象；

2.函数在一个对象中，此时this指向这个对象。

然而，函数被异步调用时，第二条应该被忽视，例如一个点击处理函数或者setTimeout。例如：

Person.getName(); // 'this' 指向 Person

setTimeout(Person.getName, 1000); // 'this' 指向全局对象     


**Javascript秘密之五：保护全局作用域**

Javascript的一个缺点的一个页面中的脚本都在一个共享的全局上下文中被执行。这一缺点可以导致网站受到跨域脚本攻击。共享全局上下文还会导致其他问题。例如，许多脚本在一个页面中运行，但是并不是所有的都由你来决定（例如广告）。这些在全局空间中运行的脚本可以获取同一个全局变量。如果有两段脚本碰巧使用同一个全局变量，它们会开始相互影响。代码可能会中断。

减少使用全局作用域是一个消除代码互相干涉的防御性技巧，它能帮你省下不少调试时间。有时你也许不能消除全局变量，但是你可以使用一些技巧例如命名空间来减少你留下的足迹：

// 命名空间

//一个全局足迹是包含了其他需要引用的变量

var MyApp = {};



MyApp.id = 42;

MyApp.utils = {

validate: function(){

//do work

}

};   
或者使用模块模式：

// 模块模式

//模块模式依赖于自调用匿名函数，它创建的闭包拥有获取父函数中变量的能力

var MyApp = (function(){

//declare a local variable

var appId = 42;



function getAppId(){


//指向这个函数符作用域中的一个变量

return appId;

}



return {

getAppId: getAppId

};

}());



appId; // undefined

MyApp.appId; //undefined

MyApp.getAppId(); // 返回 42. (通过闭包获取）    


**Javascript秘密之六：继承**

关于继承，由于一些原因Javascript有一个长而令人困惑的历史。许多开发者 -- 包括我遇到的一些Javascript开打折 --对传统模型理解深刻但是却被原型模型完全搞糊涂了。如果你阅读了《使用原型继承的语言列表》一文之后，你会感触更深。

除了Javascript之外，原型继承并不是主流语言的继承方式。更糟的是，在Javascript中可以模拟传统模型的继承方式。结果导致了Javascript中有许多中继承方式，它们中的许多互不相让甚至互相冲突。我建议完全抛弃伪传统继承方式，它是Javascript的一个警告。虽然传统继承方式对其他开发者来说很熟悉，但是由于它只是一个模拟方式，它会很快导致代码的崩溃。

本文译自6 secrets of JavaScript Jedis，原文地址http://www.infoworld.com/d/application-development/6-secrets-of-javascript-jedis-231322?page=0,2


