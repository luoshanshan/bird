define(['RoleBase', 'util'], function(RoleBase, util) {
	/*
	 * @大地类
	 * @param { options: Object } 可配参数
	 * @param { options.ctx: Context } 绘图上下文
	 * @param { options.img: Image } 大地图
	 * @param { options.speed: speed } 速度
	 * */
	function Land(options) {
	    
	    // 借用基类给我的实例初始化属性
	    RoleBase.call(this, options);
	
	    // 根据Land的数量动态计算x轴坐标
	    this.x = this.width * Land.len++;
	    this.y = this.ctx.canvas.height - this.height;
	}
	
	// 用来记录已创建的实例个数
	Land.len = 0;
	
	// 原型扩展
	util.extend(Land.prototype, RoleBase.prototype, {});
	
	return Land;
});

