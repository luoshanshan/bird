/*
 * 图片资源加载器对象：
 *
 * 依赖关系：
 * 依赖与util对象。
 * 依赖与事件对象。
 *
 * srcs{ 属性 }: 要加载的所有资源地址
 * 数据格式：{ name1: src, name2: src, name3: src... }
 *
 * load{ 方法 }: 开始加载资源
 * 语法：imgLoad.load()
 *
 * imgAllLoaded{ 事件 }: 全部资源加载完毕时触发的事件
 * 监听语法：imgLoad.on('imgAllLoaded', 回调)
 *
 * */

define(['E', 'util'], function(E, util) {
	
	function ImgLoad(srcs) {
	    E.call(this);
	    this.srcs = srcs;
	}
	
	util.extend(ImgLoad.prototype, E.prototype, {
	    load: function() {
	        /*
	        * 1、求要加载的资源总和
	        * 2、一个资源对应创建一个img对象
	        * 3、一个存储所有img对象的容器
	        * 4、监听所有img的load事件，保证全部load完毕后，
	        * 触发imgAllLoaded，同时把所有加载完毕的img传递给事件回调。
	        * */
	
	        var imgTotal = 0, imgLoadedTotal = 0,
	            tempImg, imgs = {},
	            key,
	            self = this;
	
	        // 遍历所有的资源
	        for(key in this.srcs) {
	
	            // 求资源总和
	            imgTotal++;
	
	            // 一个资源创建一个img对象，然后存储
	            tempImg = new Image();
	            tempImg.src = this.srcs[key];
	            imgs[key] = tempImg;
	
	            // 一个img加载完毕后，进行记录，
	            // 然后判断记录的数量有没有达到要加载的数量，
	            // 如果到达了，那么触发imgAllLoaded事件，传递加载好的所有图片
	            tempImg.onload = function() {
	                if(++imgLoadedTotal >= imgTotal) {
	                    self.trigger('imgAllLoaded', imgs);
	                }
	            }
	        }
	
	        // 返回实例，可以链式编程
	        return this;
	    }
	});

	return ImgLoad;
});
