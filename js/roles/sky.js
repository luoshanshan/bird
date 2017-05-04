define(['RoleBase', 'util'], function(RoleBase, util) {
	/*
	* @背景类
	* @param { options: Object } 可配参数
	* @param { options.ctx: Context } 绘图上下文
	* @param { options.img: Image } 背景图
	* @param { options.speed: speed } 速度
	* */
	function Sky(options) {
	
	    // 借用基类给我的实例初始化属性
	    RoleBase.call(this, options);
	
	    // 根据sky的数量动态计算x轴坐标
	    this.x = this.width * Sky.len++;
	    this.y = 0;
	}
	
	// 用来记录已创建的实例个数
	Sky.len = 0;
	
	// 原型扩展
	util.extend(Sky.prototype, RoleBase.prototype, {});
	
	return Sky;
});


