/*
* 自定义事件对象：
*
* events: 存储事件回调
* 数据格式：{ 'click': [ fn1, fn2, fn3 ], 'mousedown': [ fn1, fn2, fn3 ]... }
*
* on: 绑定事件
* 语法：e.on('事件类型', 回调)
*
*
* off：解除事件
* 语法：e.off('事件类型', 回调)  ==> 删除指定事件中的指定回调
*
*
* trigger: 触发事件
* 语法：e.trigger('事件类型', 传给事件回调的数据)
*
* */

define([], function() {
	
	function E() {
	    this.events = {};
	}
	
	// 原型扩展方法
	E.prototype = {
	
	    // 绑定事件回调 ==> 根据事件类型，存储事件回调
	    on: function(type, fn) {
	
	        // 如果之前没有对应的事件数组，那么初始化一下，然后push回调
	        (this.events[type] || (this.events[type] = [])).push(fn);
	    },
	
	    // 解除事件回调 ==> 根据事件类型，删除事件回调
	    off: function(type, fn) {
	
	        // 有对应的事件数组，就取对应长度-1；没有则取-1
	        var i = (this.events[type] && this.events[type].length - 1) || -1;
	
	        // 遍历事件数组，删除对应的回调
	        for(; i >= 0; i--) {
	            if(this.events[type][i] === fn) {
	                this.events[type].splice(i, 1);
	            }
	        }
	    },
	
	    // 触发事件 ==> 遍历对应的事件数组，得到所有的回调依次执行
	    trigger: function(type, data) {
	        (this.events[type] || []).forEach(function(fn) {
	            fn(data);
	        });
	    }
	};

	return E;
});

