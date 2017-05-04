define(['RoleBase'], function(RoleBase) {
	/*
	 * @鸟类
	 * @param { options.ctx: Context } 绘图上下文
	 * @param { options.img: Image } 背景图
	 * @param { options.speed: speed } 速度
	 * @param { options.widthFrame: number } 一排有多少张
	 * @param { options.heightFrame: number } 一列有多少张
	 * @param { options.x: number } 小鸟x轴起始坐标
	 * @param { options.y: number } 小鸟y轴起始坐标
	 * */
	function Bird(options) {
	    RoleBase.call(this, options);
	
	    // 计算一个小鸟的宽与高
	    this.widthFrame = options.widthFrame || 1;
	    this.heightFrame = options.heightFrame || 1;
	    this.width = this.img.width / this.widthFrame;
	    this.height = this.img.height / this.heightFrame;
	
	    // 控制小鸟第几个动作
	    this.index = 0;
	
	    // 小鸟坐标
	    this.x = options.x || 10;
	    this.y = options.y || 10;
	
	    // 加速度
	    this.speedPlus = 0.2;
	}
	
	// 原型扩展
	Bird.prototype = {
	
	    // 根据实例属性绘制
	    draw: function() {
	        this.ctx.drawImage(this.img,
	            this.width * this.index, 0, this.width, this.height,
	            this.x, this.y, this.width, this.height);
	    },
	
	    // 更新小鸟下一帧数据
	    update: function() {
	        this.index = ++this.index % this.widthFrame;
	        this.y += this.speed;
	        this.speed += this.speedPlus;
	    },
	
	    // 向上挥动一下翅膀
	    flyup: function() {
	        this.speed = -5;
	    }
	}

	return Bird;
});
