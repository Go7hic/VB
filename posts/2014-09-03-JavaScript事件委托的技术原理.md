---
layout:     post
title:      JavaScript事件委托的技术原理
date: 2014-09-03
description: 
---

我们知道函数都是对象，都会占用内存，内存中的对象越多，性能越差。而且，添加到页面上的事件处理程序数量会直接关系到页面的整体性能。那么有没有什么方法能够解决一点相关的问题呢？有，事件委托就是“事件处理程序数量过多”导致的问题的解决方法。

使用事件委托技术能让你避免对特定的每个节点添加事件监听器；相反，事件监听器是被添加到它们的父元素上。事件监听器会分析从子元素冒泡上来的事件，找到是哪个子元素的事件。基本概念非常简单，但仍有很多人不理解事件委托的工作原理。这里我将要解释事件委托是如何工作的，并提供几个纯JavaScript的基本事件委托的例子。
<!-- more -->
假定我们有一个UL元素，它有几个子元素：

```
<ul id="parent-list">
	<li id="post-1">Item 1</li>
	<li id="post-2">Item 2</li>
	<li id="post-3">Item 3</li>
	<li id="post-4">Item 4</li>
	<li id="post-5">Item 5</li>
	<li id="post-6">Item 6</li>
</ul>
```
我们还假设，当每个子元素被点击时，将会有各自不同的事件发生。你可以给每个独立的li元素添加事件监听器，但有时这些li元素可能会被删除，可能会有新增，监听它们的新增或删除事件将会是一场噩梦，尤其是当你的监听事件的代码放在应用的另一个地方时。但是，如果你将监听器安放到它们的父元素上呢？你如何能知道是那个子元素被点击了？

简单：当子元素的事件冒泡到父ul元素时，你可以检查事件对象的target属性，捕获真正被点击的节点元素的引用。下面是一段很简单的JavaScript代码，演示了事件委托的过程：

```
// 找到父元素，添加监听器...
document.getElementById("parent-list").addEventListener("click",function(e) {
	// e.target是被点击的元素!
	// 如果被点击的是li元素
	if(e.target && e.target.nodeName == "LI") {
		// 找到目标，输出ID!
		console.log("List item ",e.target.id.replace("post-")," was clicked!");
	}
});
```
第一步是给父元素添加事件监听器。当有事件触发监听器时，检查事件的来源，排除非li子元素事件。如果是一个li元素，我们就找到了目标！如果不是一个li元素，事件将被忽略。这个例子非常简单，UL和li是标准的父子搭配。让我们试验一些差异比较大的元素搭配。假设我们有一个父元素div，里面有很多子元素，但我们关心的是里面的一个带有”classA” CSS类的A标记：


```
// 获得父元素DIV, 添加监听器...
document.getElementById("myDiv").addEventListener("click",function(e) {
	// e.target是被点击的元素
	if(e.target && e.target.nodeName == "A") {
		// 获得CSS类名
		var classes = e.target.className.split(" ");
		// 搜索匹配!
		if(classes) {
			// For every CSS class the element has...
			for(var x = 0; x < classes.length; x++) {
				// If it has the CSS class we want...
				if(classes[x] == "classA") {
					// Bingo!
					console.log("Anchor element clicked!");

					// Now do something here....

				}
			}
		}

	}
});
```
上面这个例子中不仅比较了标签名，而且比较了CSS类名。虽然稍微复杂了一点，但还是很具代表性的。比如，如果某个A标记里有一个span标记，则这个span将会成为target元素。这个时候，我们需要上溯DOM树结构，找到里面是否有一个 A.classA 的元素。

因为大部分程序员都会使用jQuery等工具库来处理DOM元素和事件，我建议大家都使用里面的事件委托方法，因为这里工具库里都提供了高级的委托方法和元素甄别方法。

希望这篇文章能帮助你理解JavaScript事件委托的幕后原理，希望你也感受到了事件委托的强大用处！

总结

事件委托的好处：提高性能；后面新添加的元素也会有之前的事件。
所有用到按钮的时间都适合采用事件委托技术，最适合采用事件委托技术的事件包括click,mousedown,mouseup,keydown,keyup,keypress。


