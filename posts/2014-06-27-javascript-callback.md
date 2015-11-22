---
layout:     post
title:      深入理解js里的回调函数
date: 2014-06-27
description: 
---

在Javascript中，函数是第一类对象，这意味着函数可以像对象一样按照第一类管理被使用。既然函数实际上是对象：它们能被“存储”在变量中，能作为函数参数被传递，能在函数中被创建，能从函数中返回。

因为函数是第一类对象，我们可以在Javascript使用回调函数。在下面的文章中，我们将学到关于回调函数的方方面面。回调函数可能是在Javascript中使用最多的函数式编程技巧，虽然在字面上看起来它们一直一小段Javascript或者jQuery代码，但是对于许多开发者来说它任然是一个谜。在阅读本文之后你能了解怎样使用回调函数。
<!-- more -->
回调函数是从一个叫函数式编程的编程范式中衍生出来的概念。简单来说，函数式编程就是使用函数作为变量。函数式编程过去 - 甚至是现在，依旧没有被广泛使用 - 它过去常被看做是那些受过特许训练的，大师级别的程序员的秘传技巧。

幸运的是，函数式编程的技巧现在已经被充分阐明因此像我和你这样的普通人也能去轻松使用它。函数式编程中的一个主要技巧就是回调函数。在后面内容中你会发现实现回调函数其实就和普通函数传参一样简单。这个技巧是如此的简单以致于我常常感到很奇怪为什么它经常被包含在讲述Javascript高级技巧的章节中。

###什么是回调或者高阶函数

一个回调函数，也被称为高阶函数，是一个被作为参数传递给另一个函数（在这里我们把另一个函数叫做“otherFunction”）的函数，回调函数在otherFunction中被调用。一个回调函数本质上是一种编程模式（为一个常见问题创建的解决方案），因此，使用回调函数也叫做回调模式。

下面是一个在jQuery中使用回调函数简单普遍的例子：

/注意到click方法中是一个函数而不是一个变量
//它就是回调函数
$("#btn_1").click(function() {
  alert("Btn 1 Clicked");
});     
正如你在前面的例子中看到的，我们将一个函数作为参数传递给了click方法。click方法会调用（或者执行）我们传递给它的函数。这是Javascript中回调函数的典型用法，它在jQuery中广泛被使用。

下面是另一个Javascript中典型的回调函数的例子：

```javascript
var friends = ["Mike", "Stacy", "Andy", "Rick"];
friends.forEach(function (eachName, index){
console.log(index + 1 + ". " + eachName); // 1. Mike, 2. Stacy, 3. Andy, 4. Rick
});
```

再一次，注意到我们讲一个匿名函数（没有名字的函数）作为参数传递给了forEach方法。

到目前为止，我们将匿名函数作为参数传递给了另一个函数或方法。在我们看更多的实际例子和编写我们自己的回调函数之前，先来理解回调函数是怎样运作的。

###回调函数是怎样运作的？

因为函数在Javascript中是第一类对象，我们像对待对象一样对待函数，因此我们能像传递变量一样传递函数，在函数中返回函数，在其他函数中使用函数。当我们将一个回调函数作为参数传递给另一个函数是，我们仅仅传递了函数定义。我们并没有在参数中执行函数。我们并不传递像我们平时执行函数一样带有一对执行小括号()的函数。

需要注意的很重要的一点是回调函数并不会马上被执行。它会在包含它的函数内的某个特定时间点被“回调”（就像它的名字一样）。因此，即使第一个jQuery的例子如下所示：

```javascript
//匿名函数不会再参数中被执行
//这是一个回调函数    
$("#btn_1").click(function(){
    alert("Btn 1 Clicked");
});
```
这个匿名函数稍后会在函数体内被调用。即使有名字，它依然在包含它的函数内通过arguments对象获取。

###回调函数是闭包

当我们能够把一个回调函数作为一个argument传递给另一个函数时，这个回调函数在包含它的函数内的某一点执行，就好像这个回调函数是在包含它的函数中定义的一样。这意味着回调函数本质上是一个闭包。

正如我们所知，闭包能够进入包含它的函数的作用域，因此回调函数能获取包含它的函数中的变量，以及全局作用域中的变量。

###实现回调函数的基本原理

回调函数并不复杂，但是在我们开始创建并使用回调函数之前，我们应该熟悉几个实现回调函数的基本原理。

使用命名或匿名函数作为回调

在前面的jQuery例子以及forEach的例子中，我们使用了再参数位置定义的匿名函数作为回调函数。这是在回调函数使用中的一种普遍的魔术。另一种常见的模式是定义一个命名函数并将函数名作为变量传递给函数。比如下面的例子：
```javascript
//全局变量
var allUserData = [];

//普通的logStuff函数，将内容打印到控制台     
function logStuff (userData){
    if ( typeof userData === "string")
    {
        console.log(userData);
    }
    else if ( typeof userData === "object"){
        for(var item in userData){
            console.log(item + ": " + userData[item]);
        }
    }
} 

//一个接收两个参数的函数，后面一个是回调函数     
function getInput (options, callback){
    allUserData.push(options);
    callback(options);
}

//当我们调用getInput函数时，我们将logStuff作为一个参数传递给它     
//因此logStuff将会在getInput函数内被回调（或者执行）     
getInput({name:"Rich",speciality:"Javascript"}, logStuff);
//name:Rich
//speciality:Javascript
```

传递参数给回调函数

既然回调函数在执行时仅仅是一个普通函数，我们就能给它传递参数。我们能够传递任何包含它的函数的属性（或者全局属性）作为回调函数的参数。在前面的例子中，我们将options作为一个参数传递给了回调函数。现在我们传递一个全局变量和一个本地变量：
```javascript
//全局变量
var generalLastName = "Cliton"；

function getInput (options, callback){
    allUserData.push (options);
    //将全局变量generalLastName传递给回调函数
    callback(generalLastName,options);
}
```

在执行之前确保回调函数是一个函数

在调用之前检查作为参数被传递的回调函数确实是一个函数，这样的做法是明智的。同时，这也是一个实现条件回调函数的最佳时间。

我们来重构上面例子中的getInput函数来确保检查是恰当的。
```javascript
function getInput(options, callback){
    allUserData.push(options);    
    //确保callback是一个函数    
    if(typeof callback === "function"){
        //调用它，既然我们已经确定了它是可调用的
          callback(options);
    }
}
```
如果没有适当的检查，如果getInput的参数中没有一个回调函数或者传递的回调函数事实上并不是一个函数，我们的代码将会导致运行错误。

###使用this对象的方法作为回调函数时的问题

当回调函数是一个this对象的方法时，我们必须改变执行回调函数的方法来保证this对象的上下文。否则如果回调函数被传递给一个全局函数，this对象要么指向全局window对象（在浏览器中）。要么指向包含方法的对象。 
我们在下面的代码中说明：
```javascript
//定义一个拥有一些属性和一个方法的对象 //我们接着将会把方法作为回调函数传递给另一个函数

var clientData = {
    id: 094545,
    fullName "Not Set",
    //setUsrName是一个在clientData对象中的方法
    setUserName: fucntion (firstName, lastName){
        //这指向了对象中的fullName属性
        this.fullName = firstName + " " + lastName;
    }
} 

function getUserInput(firstName, lastName, callback){
    //在这做些什么来确认firstName/lastName

    //现在存储names
    callback(firstName, lastName);
}
```
在下面你的代码例子中，当clientData.setUsername被执行时，this.fullName并没有设置clientData对象中的fullName属性。相反，它将设置window对象中的fullName属性，因为getUserInput是一个全局函数。这是因为全局函数中的this对象指向window对象。
```javascript
getUserInput("Barack","Obama",clientData.setUserName);

console.log(clientData,fullName);  //Not Set

//fullName属性将在window对象中被初始化     
console.log(window.fullName);  //Barack Obama
```
使用Call和Apply函数来保存this

我们可以使用Call或者Apply函数来修复上面你的问题。到目前为止，我们知道了每个Javascript中的函数都有两个方法:Call 和 Apply。这些方法被用来设置函数内部的this对象以及给此函数传递变量。

call接收的第一个参数为被用来在函数内部当做this的对象，传递给函数的参数被挨个传递（当然使用逗号分开）。Apply函数的第一个参数也是在函数内部作为this的对象，然而最后一个参数确是传递给函数的值的数组。

ring起来很复杂，那么我们来看看使用Apply和Call有多么的简单。为了修复前面例子的问题，我将在下面你的例子中使用Apply函数：
```javascript
//注意到我们增加了新的参数作为回调对象，叫做“callbackObj”
function getUserInput(firstName, lastName, callback. callbackObj){
        //在这里做些什么来确认名字

        callback.apply(callbackObj, [firstName, lastName]);
}
```
使用Apply函数正确设置了this对象，我们现在正确的执行了callback并在clientData对象中正确设置了fullName属性：

//我们将clientData.setUserName方法和clientData对象作为参数，clientData对象会被Apply方法使用来设置this对象     
getUserName("Barack", "Obama", clientData.setUserName, clientData);

//clientData中的fullName属性被正确的设置
console.log(clientUser.fullName); //Barack Obama
我们也可以使用Call函数，但是在这个例子中我们使用Apply函数。

允许多重回调函数

我们可以将不止一个的回调函数作为参数传递给一个函数，就像我们能够传递不止一个变量一样。这里有一个关于jQuery中AJAX的例子：
```javascript
function successCallback(){
    //在发送之前做点什么
}     

function successCallback(){
  //在信息被成功接收之后做点什么
}

function completeCallback(){
  //在完成之后做点什么
}

function errorCallback(){
    //当错误发生时做点什么
}

$.ajax({
    url:"http://fiddle.jshell.net/favicon.png",
    success:successCallback,
    complete:completeCallback,
    error:errorCallback

});
```

###“回调地狱”问题以及解决方案

在执行异步代码时，无论以什么顺序简单的执行代码，经常情况会变成许多层级的回调函数堆积以致代码变成下面的情形。这些杂乱无章的代码叫做回调地狱因为回调太多而使看懂代码变得非常困难。我从node-mongodb-native，一个适用于Node.js的MongoDB驱动中拿来了一个例子。这段位于下方的代码将会充分说明回调地狱：
```javascript
 var p_client = new Db('integration_tests_20', new Server("127.0.0.1", 27017, {}), {'pk':CustomPKFactory});
    p_client.open(function(err, p_client) {
        p_client.dropDatabase(function(err, done) {
            p_client.createCollection('test_custom_key', function(err, collection) {
                collection.insert({'a':1}, function(err, docs) {
                    collection.find({'_id':new ObjectID("aaaaaaaaaaaa")}, function(err, cursor) {
                        cursor.toArray(function(err, items) {
                            test.assertEquals(1, items.length);

                            // Let's close the db
                            p_client.close();
                        });
                    });
                });
            });
        });
    });
```

你应该不想在你的代码中遇到这样的问题，当你当你遇到了-你将会是不是的遇到这种情况-这里有关于这个问题的两种解决方案。

给你的函数命名并传递它们的名字作为回调函数，而不是主函数的参数中定义匿名函数。
模块化L将你的代码分隔到模块中，这样你就可以到处一块代码来完成特定的工作。然后你可以在你的巨型应用中导入模块。
创建你自己的回调函数

既然你已经完全理解了关于Javascript中回调函数的一切（我认为你已经理解了，如果没有那么快速的重读以便），你看到了使用回调函数是如此的简单而强大，你应该查看你的代码看看有没有能使用回调函数的地方。回调函数将在以下几个方面帮助你： 
- 避免重复代码（DRY-不要重复你自己） - 在你拥有更多多功能函数的地方实现更好的抽象（依然能保持所有功能） - 让代码具有更好的可维护性 
- 使代码更容易阅读 
- 编写更多特定功能的函数

创建你的回调函数非常简单。在下面的例子中，我将创建一个函数完成以下工作：读取用户信息，用数据创建一首通用的诗，并且欢迎用户。这本来是个非常复杂的函数因为它包含很多if/else语句并且，它将在调用那些用户数据需要的功能方面有诸多限制和不兼容性。

相反，我用回调函数实现了添加功能，这样一来获取用户信息的主函数便可以通过简单的将用户全名和性别作为参数传递给回调函数并执行来完成任何任务。

简单来讲，getUserInput函数是多功能的：它能执行具有无种功能的回调函数。
```javascript
//首先，创建通用诗的生成函数；它将作为下面的getUserInput函数的回调函数
    function genericPoemMaker(name, gender) {
        console.log(name + " is finer than fine wine.");
        console.log("Altruistic and noble for the modern time.");
        console.log("Always admirably adorned with the latest style.");
        console.log("A " + gender + " of unfortunate tragedies who still manages a perpetual smile");
    }
        //callback，参数的最后一项，将会是我们在上面定义的genericPoemMaker函数
        function getUserInput(firstName, lastName, gender, callback) {
            var fullName = firstName + " " + lastName;
            // Make sure the callback is a function
            if (typeof callback === "function") {
            // Execute the callback function and pass the parameters to it
            callback(fullName, gender);
            }
        }    

```
调用getUserInput函数并将genericPoemMaker函数作为回调函数：   
```
    getUserInput("Michael", "Fassbender", "Man", genericPoemMaker);
    // 输出
    /* Michael Fassbender is finer than fine wine.
    Altruistic and noble for the modern time.
    Always admirably adorned with the latest style.
    A Man of unfortunate tragedies who still manages a perpetual smile.
    */
```
因为getUserInput函数仅仅只负责提取数据，我们可以把任意回调函数传递给它。例如，我们可以传递一个greetUser函数：
```javascript
unction greetUser(customerName, sex)  {
   var salutation  = sex && sex === "Man" ? "Mr." : "Ms.";
  console.log("Hello, " + salutation + " " + customerName);
}

// 将greetUser作为一个回调函数
getUserInput("Bill", "Gates", "Man", greetUser);

// 这里是输出
Hello, Mr. Bill Gates
```
我们调用了完全相同的getUserInput函数，但是这次完成了一个完全不同的任务。

正如你所见，回调函数很神奇。即使前面的例子相对简单，想象一下能节省多少工作量，你的代码将会变得更加的抽象，这一切只需要你开始使用毁掉函数。大胆的去使用吧。

在Javascript编程中回调函数经常以几种方式被使用，尤其是在现代web应用开发以及库和框架中：

>.异步调用（例如读取文件，进行HTTP请求，等等）
>.时间监听器/处理器
>.setTimeout和setInterval方法
>.一般情况：精简代码

结束语

Javascript回调函数非常美妙且功能强大，它们为你的web应用和代码提供了诸多好处。你应该在有需求时使用它；或者为了代码的抽象性，可维护性以及可读性而使用回调函数来重构你的代码。 
原文： http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/


