/*
* util.js
*/

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
	return Object.prototype.toString.call(arr) === "[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
	return Object.prototype.toString.call(fn) === "[object Function]";
}

function isDate(date) {
	return Object.prototype.toString.call(date) ==="[object Date]";
}

function isObject(obj) {
	return Object.prototype.toString.call(obj) === "[object Object]";
}

function isNumber(num) {
	return Object.prototype.toString.call(num) === "[object Number]";
}

function isString(str) {
	return Object.prototype.toString.call(str) === "[object String]";
}

function isBoolean(bool) {
	return Object.prototype.toString.call(bool) === "[object Boolean]";
}


// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
	if (typeof src === "undefined") {//未赋值或未定义
		return false;
	} else if (isArray(src)) {//数组
		var o = [];
		for (var i = 0; i < src.length; i++) {
			o[i] = typeof src[i] === "object" ? arguments.callee(src[i]) : src[i];
		}
		return o;
	} else if (isObject(src)) {//对象
		var o = {};
		for (var prop in src) {//有缺陷，内置属性没有列出，除非重写（IE8及以下不支持）
			if (src.hasOwnProperty(prop)) {//兼容
				o[prop] = typeof src[prop] === "object" ? arguments.callee(src[prop]) : src[prop];
			}
		}
		return o;
	} else if (isNumber(src) || isBoolean(src) || isString(src) || isDate(src)) {//其他
		return new src.constructor(src.valueOf());
	}
}


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
	if (isArray(arr)) {
		var newArr = [];
		for (var i = 0; i < arr.length; i++) {
			if (newArr.indexOf(arr[i]) < 0 && (isNumber(arr[i]) || isString(arr[i]))) {
				newArr.push(arr[i]);
			}
		}
		return newArr;
	} else {
		return false;
	}
}


// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
	if (!isString(str)) {
		return false;
	}
	if (str[0] === " " || str[0] === "\t") {//全等优先级大于逻辑或
		str = simpleTrim(str.slice(1, str.length));
	}
	if (str[str.length-1] === " " || str[0] === "\t") {
		str = simpleTrim(str.slice(0, str.length-1));
	}
	return str;
}


// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
	//使用正则
	var strReg = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g //本来是用\s来匹配，扫了一下jQ就换了，具体见学习记录.md
	return str == str.replace(strReg, '');
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn) {
	if (!isArray(arr) && !isFunction(fn)) {
		return false;
	}
	for (var i = 0; i < arr.length; i++) {
		fn(arr[i], i);
	}
}


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var prop, sum = 0;
	for (var prop in obj) {
		sum++;
	}
	return sum;
}


// 判断是否为邮箱地址
function isEmail(emailStr) {
	var emailReg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/g;
	if (emailReg.test(emailStr)) {
		return true;
	} else {
		return false;
	}
}


// 判断是否为手机号
function isMobilePhone(phone) {
	var phoneReg = /^1[3|4|5|8][0-9]\d{4,8}$/g;
	if (phoneReg.test(phone)) {
		return true;：
	} else {
		return false;
	}
}


// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
	element.className = element.className + " " + newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
	var arr;
	arr = element.className.split(" ");
	for (var i = 0; i < arr.length; i++) {
		if(arr[i] === oldClassName) {
			arr.splice(i, 1);
		}
	}
	element.className = arr.join(" ");
}


// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
	if (element.parentNode ==== siblingNode.parentNode) {
		return true;
	} else {
		return false;
	}
}


// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	return {
		x: element.getBoundingClientRect().left;
		y: element.getBoundingClientRect().top
	};
}


function hasClass(node, className) {
	var cNames = node.className.split(/\s+/);//根据空格来分割node里的元素
	for(var i = 0; i < cNames.length; i++) {
		if(cNames[i] == className) {
			return true
		};
	}
	return false;
}

//用于寻找带有指定class的元素
function getByClass(className) {
	if(document.getElementsByClassName){
		return document.getElementsByClassName(className);
	}
	var nodes = document.getElementsByTagName("*");
	var arr = [];
	for(var i = 0; i < nodes.length; i++){
		if(hasClass(nodes[i],className)) {
			arr.push(nodes[i]);
		}
	}
	return arr;
}


//用于寻找带有指定属性值的元素
function getByAttr(attr, attrVal) {
	var nodes = document.getElementsByTagName("*");
	var arr = [], arr1 = [], arr2 = [];
	for (var i = 0; i < nodes.length; i++) {
		if(nodes[i].attr) {
			arr1.push(nodes[i]);
			if(arguments[1]) {
				if(nodes[i].getAttribute(attr) === attrVal) {
					arr2.push(nodes[i]);
					return arr2;
				}
			} else {
				return arr1;
			}
		};
	}
}


// 实现一个简单的Query
//分为两种情况来讨论，单个选择器和多个选择器
function $(selector) {
	if (selector.search(/\s+/) === -1) {//单个选择器
		var str = selector;
		switch (selector.charAt(0)) {
			case "#":
				strId = str.splice(0, 1);
				return document.getElementById(strId);
				break;
			case ".":
				strClass = str.splice(0, 1);
				return document.getByClass(strClass);
				break;
			case "[":
				strAttr = str.splice(0, 1);
				strAttr = strAttr.splice(strAttr.length-1, 1);
				strAttr = strAttr.split("=");
				return document.getByAttr(strAttr[0], strAttr[1]);//split之后为数组
				break;
			default:
				return document.getElementsByTagName(str)[0];
		}
	} else {//多个选择器
		var arr = str.split(" ");
		var sSon = $(arr[0]).children;
		for (var i = 0; i < sSon.length; i++) {
			if ($(arr[1]) === sSon[i]) {
				return sSon[i];
				break;
			}
		}
	}
}


var eventUtil = {
// 给一个element绑定一个针对event事件的响应，响应函数为listener
	addEvent: function (element, event, listener) {
		if(element.addEventListener) {
			element.addEventListener(event, listener, false);
		} else if(element.attachEvent) {
			element.attachEvent("on" + event, listener);
		} else {
			element["on" + event] = listener;
		}
	},


// 移除element对象对于event事件发生时执行listener的响应
	removeEvent: function (element, event, listener) {
		if(element.removeEventListener) {
			element.removeEventListener(event, listener, false);
		} else if(element.detachEvent) {
			element.detachEvent("on" + event, listener);
		} else {
			element["on" + event]=null;
		}
	}
}


// 实现对click事件的绑定
function addClickEvent(element, listener) {
    eventUtil.addEvent(element, "click", listener);
}


// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    eventUtil.addEvent(element, "keydown", function(e) {
    	e = e || window.event;
    	if(e.keyCode == 13) {
    		listener();
    	} else {
    		return;
    	}
    });
}

$.on = eventUtil.addEvent;
$.un = eventUtil.removeEvent;
$.click = eventUtil.addClickEvent;
$.enter = eventUtil.addEnterEvent;


//事件代理
function delegatEvent(element, tag, eventName, listener) {
	eventUtil.addEvent(element, "click", function(e) {
		var e = e || window.event;
		if(e.target && e.target.nodeName.toLowerCase() == tag) {
			listener();
		}
	});
}

$.delegate = delegateEvent;

// 把上面几个函数和$做一下结合，把他们变成$对象的一些方法
//这里的操作的效果应该和上面"$.on = "的效果应该是一样的。

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {//需要注意：由于 navigator 可误导浏览器检测，使用对象检测可用来嗅探不同的浏览器
	if(window.ActiveXObject) {
		var ua = navigator.userAgent.toLowerCase();
        var ie = ua.match(/msie ([\d.]+)/)[1];
        return ie;
	} else {
		return -1;
	}
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {//参看w3cschool
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = cookieName + "=" + escape(cookieValue) + 
					  ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

// 获取cookie值
function getCookie(cookieName) {//参看w3cschool
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(cookieName + "=");
		if (c_start!=-1) {
			c_start=c_start + cookieName.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) {
				c_end=document.cookie.length;
			}
	    return unescape(document.cookie.substring(c_start,c_end));
	    } 
	  }
	return "";
}


//学习Ajax，并尝试自己封装一个Ajax方法
function ajax(url, options) {
	var xhr,
		type = options.type || "get",//默认为get
		data = options.data || "",//默认为空
        onsuccess = options.onsuccess,
        onfail = options.onfail || function(err) {console.log(err)};
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(options.type === "get" || "GET"){
		xhr.open(options.type, url, true);
		xhr.onreadystatechange = function() {
			if(xhr.readyState ==4 && xhr.status ==200) {
				options.onsuccess(xhr.responseText, xhr);
			} else if(xhr.status == 404) {
				options.onfail(xhr.responseText, xhr);
			}
		}
		xhr.send();
	}
	if(options.type === "post" || "POST"){
		xhr.open(options.type, url, true);
		xhr.onreadystatechange = function() {
			if(xhr.readyState ==4 && xhr.status ==200) {
				options.onsuccess(xhr.responseText, xhr);
			} else if(xhr.status == 404) {
				options.onfail(xhr.responseText, xhr);
			}
		}
		xhr.send(options.data);
	}

}