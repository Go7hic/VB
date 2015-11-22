---
layout:     post
title:      谈谈Js里变量作用域和上下文
date: 2014-04-27
tags: JavaScript
description: 
---
由于不是第一次看Js的书，所以对于这本犀牛书里的内容我可能不会按顺序来看，会选一些我觉得需要重复了解的一些章节跳着看。今天看了下变量作用域和函数这两部分的内容。大家都知道作用域和闭包几乎是毕业狗去面试必问的。 


现在就结合网上的一篇文章在重新回顾下作用域这个东西吧。
作用域和上下文并不是同一个东西，很多人可能会把它搞混。每一个函数调用都联系着一个作用域和一个上下文。根本上来说，作用域是基于函数的而上下文是基于对象的。换句话说，作用域与函数调用是能够获取的变量有联系，它对与每一次调用来说都是独一无二的。上下文常常代表this变量的值，它指向“拥有”当前执行的这段代码的对象。

**变量作用域**

一个变量的作用域是程序源代码中定义这个变量的区域。全局变量拥有全局作用域，在js代码里的任何地方都是有定义的。然而在函数内声明的变量只在函数体内有定义，他们是局部变量，作用域是局部性的，函数参数也是局部变量，他们只在函数体内有定义。在函数体内局部变量的优先级高于同名的全局变量，如果在函数体内声明的一个局部变量或者函数参数中带有的变量和全局变量重名，那么全局变量就被局部变量所遮盖。

Javascript目前并不支持块作用域，在其中你可以在一个if 声明，switch声明，for循环或者while循环中定义一个变量作用域。这意味着变量在开闭花括号之外不能被获取。目前来说，任何定义在块内的变量都能在块之外被获取。然而，这样的情况马上就要改变了，为了支持定义块作用域变量，let关键字已经被官方增加到了ES6的标准中.


**“this”上下文**

上下文经常决定一个函数是怎么被调用的。当一个函数作为一个对象的方法被掉调用时，this指向调用这个方法的对象：
```
var object = {
    foo: function(){
        alert(this === object); 
    }
};

object.foo(); // true  
```
同样的原则也适用于当使用new操作符定义一个对象实例的情况。在这种情况下，在函数作用域内的this指向新创建的实例：
```
function foo(){
    alert(this);
}

foo() // window
new foo() // foo
```
当作为未绑定对象被调用时，this默认指向全局上下文或者浏览器中的window对象。然而，如果函数在严格模式下被执行，上下文将被默认为undefined

**执行上下文和作用域链**

Javascript是一门单线程语言，这意味着在浏览器环境下一个时间点只能做一件事。当Javascript解释器初始化执行代码时，它首先默认进入一个全局执行上下文。在此基础上每一次函数的调用都将创建一个新的执行上下文。

这里通常就是产生疑惑的地方，这里所说的“执行上下文”实际上对应着所有指向作用域的意图和目的，它于前面所讨论的上下文有所不同。这是一个很不好的命名管理，但是它很不幸的是已经被定义到了ECMAScript的标准中，这实在是让人有点无法接受。

每次一个新的执行上下文被创建时，它都被添加到了作用域链（有时它也被称为执行栈或者调用栈）的顶部。浏览器总是执行当前位于作用域链顶部的执行上下文。一旦执行完成，它就会被从栈的顶部移除，并将控制权返回到它下面的执行上下文。例如：
```
function first(){
    second();
    function second(){
        third();
        function third(){
            fourth();
            function fourth(){
                // do something
            }
        }
    }   
}
first();
```
运行上边的代码会导致嵌套函数一路执行一直到fourth函数。在这个点上的作用于连从上到下的顺序是：fourth,third,second,first,global。fourth函数可以获取到全局变量以及任何定义在first，second,third 中的变量以及函数。一旦fourth函数执行完成，它将会被从作用域中被移除，执行权将会返回到third函数。这个过程一直继续直到所有的代码完成执行。

不同执行上下文中的命名冲突将由作用域链的攀登(climbing up the scope chain)来解决，它从本地一直移动到全局。这意味着拥有相同名字并位于作用域链更上方的的本地变量会被优先获取。

一个执行上下文分为创建和执行两个阶段。在创建阶段，解释器首先创建一个变量对象（也被成为激活对象），它由执行上下文中定义的所有变量，函数声明以及参数组成。从这里开始接下来作用域连被初始化，this的值随后被决定。接着在执行阶段，代码被解释执行。

简单来说，每次当你试图获取一个函数执行上下文中的值是，查询过程将总是从自己的变量对象开始。如果这个变量在变量对象中没有被找到，搜索将会转向作用域链。它将会攀登作用域链来检查每个执行上下文，查找是个否有名字匹配的变量。

**闭包**

当一个嵌套函数试图获取外部函数之外的值时，闭包便产生了，它将在外部函数返回之后被执行。它将保持对外部函数本地变量，以及在内部定义的函数的获取能力。封装允许我们在暴露一个公共接口的情况下隐藏和保持来自外部作用域的执行上下文，并用于未来的操控。下面是一个简单的例子：
```
function foo(){
    var local = 'private variable';
    return function bar(){
        return local;
    }
}

var getLocalVariable = foo();
getLocalVariable() // private variable
```
一个最流行的闭包类型是广为流传的模块模式。它允许你模拟公共，私有以及特权成员：

```
var Module = (function(){
    var privateProperty = 'foo';

    function privateMethod(args){
        //do something
    }
    return {
        publicProperty: "",

        publicMethod: function(args){
            //do something
        },

        privilegedMethod: function(args){
            privateMethod(args);
        }
    }
})();
```
这个模块执行的过程似乎是在编译器解释它之后作为一个单体被执行。在这个闭包的执行上下文外部唯一可以获取的成员是你返回对象中的属性和方法(例如Module.publicMethod)。然而，由于执行上下文被保护，所有的私有属性和方法在应用的生命周期内都会保持活跃，这意味着所有变量在未来将可以通过共有方法被获取。

另一个类型的闭包叫做立即执行函数表达式（IIFE），它仅仅是一个在window上下文中自我调用的匿名函数：
```
function(window){
    var a = 'foo', b = 'bar';

    function private(){
        // do something
    }
    window.Module = {
        public: function(){
            // do something 
        }
    };

})(this);
```
当试图保持全局命名空间时这个表达式非常有用，任何在这个函数体内生命的变量对于闭包来说都是本地变量，但是它们又将始终在运行期间保持活跃。这是一个为应用和框架封装源代码的好方法，尤其适用于暴露一个用于交互的全局接口的情形。

**call和apply**

这是两个位于所有函数内部的简单的方法，它们使你能在任何想要的上下文中执行任何函数。call函数要求参数显式的一个一个罗列出来而apply要求你以数组的形式提供参数：
```
function user(first, last, age){     
    // do something      
}     
user.call(window, 'John', 'Doe', 30);     
user.apply(window, ['John', 'Doe', 30]); 
```
 
上面两个函数调用的结果都相同，user函数都在window上下文中被调用并都给与的三个参数。

ECMAScript 5 引入了Function.prototype.bind方法用来操纵上下文。它返回了一个永久绑定在bind函数第一个参数上下文中的函数，而不管这个函数是怎么使用的。它通过使用一个在合适的上下文中重定向调用的闭包来实现。下面是在不支持bind的浏览器中的实现方法：
```
if(!('bind' in Function.prototype)){
    Function.prototype.bind = function(){
        var fn = this, context = arguments[0], args = Array.prototype.slice.call(arguments, 1);
        return function(){
            return fn.apply(context, args);
        }
    }
}
```
这在上下文经常性丢失的情形下很常用：面向对象和事件处理。这很有必要因为一个节点的addEventListener方法总是在节点事件处理器被绑定的上下文中执行回调函数，它也应该这样做。然而如果你要使用更高级的面向对象技巧并不要一个对象的方法作为回调函数，你需要去手动调整上下文。下面的是一个用到了bind函数的例子：
```
function MyClass(){
    this.element = document.createElement('div');
    this.element.addEventListener('click', this.onClick.bind(this), false);
}

MyClass.prototype.onClick = function(e){
    // do something
};
```
当你回看bind函数的代码是，你可能会注意到其中一行代码涉及了Array对象的一个方法：
```
Array.prototype.slice.call(arguments, 1);
```
有意思的一点是这里的arguments对象并不是真正的数组，然而它经常被描述为一个类数组的对象，辟谷期更像是一个节点列表(由document.getElemntsBytagName()返回的东西)。它们包含一个Length属性和索引值但是它们任然不是数组，因此并不支持任何数组的原生方法例如slice和push。然而，由于它们太相似了，因此数组的方法能被采用或者说劫持。在上面的例子中，数组对象的方法都在一个类数组对象的上下文中被执行。

这种使用另一个对象方法的技巧也被运用于模拟传统继承方法的Javascript中的面向对象编程：
```
MyClass.prototype.init = function(){
    //在"MyClass"实例的上下文中调用超类的init方法
    MySuperClass.prototype.init.apply(this, arguments);
}
```
通过在一个子类(MyClass)实例的上下文中调用超类(MySuperClass)的方法，我们能够模仿这种强大的设计模式。

结论

在你开始学习更高级的设计模式之前，理解这些概念非常的重要，因为作用域和上下文在现代Javascript中边沿了一个重要又基础的角色。无论我们谈论闭包，面向对象还是继承，或者多种事件的实现，上下文和作用域链都扮演着一个非常重要的角色。如果你的目标是掌握Javascript语言并且更好的理解它，那么作用域链和闭包应该是你学习的起点。


