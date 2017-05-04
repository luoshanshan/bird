define(['util'], function(util) {
	
	function Pipe(options) {
	    this.ctx = options.ctx;
	    this.img = options.img;
	    this.speed = options.speed || 2;
	    this.speedPlus = options.speedPlus || 0.001;
	    this.initSpace = 200;                         // 第一根管道第一次到画布的距离
	    this.TBSpace = 120;                           // 管道上下间距
	    this.LRSpace = options.LRSpace;               // 管道左右间距
	    this.minHeight = 50;                          // 管道最小高度
	    this.maxHeight = 250;                         // 管道最大高度
	
	    // 计算管道的x轴与y轴坐标
	    this.x = (this.img.pipeDown.width + this.LRSpace) * Pipe.len++ + this.initSpace;
	    this.initY();
	}
	
	// 记录管道创建数量
	Pipe.len = 0;
	
	Pipe.prototype = {
	
	    // 重新初始化Y轴坐标
	    initY: function() {
	        var upViewHeight = util.getRandom(this.minHeight, this.maxHeight);
	        this.upY = upViewHeight - this.img.pipeDown.height;
	        this.downY = upViewHeight + this.TBSpace;
	    },
	
	    // 绘制
	    draw: function() {
	        this.ctx.drawImage(this.img.pipeDown, this.x, this.upY);
	        this.ctx.drawImage(this.img.pipeUp, this.x, this.downY);
	        this.ctx.rect(this.x, this.upY, this.img.pipeDown.width, this.img.pipeDown.height);
	        this.ctx.rect(this.x, this.downY, this.img.pipeDown.width, this.img.pipeDown.height);
	    },
	
	    // 更新数据
	    update: function() {
	        this.x -= this.speed;
	        this.speed += this.speedPlus;
	
	        // 走出去向右拼接，重新生成Y轴坐标
	        if(this.x < -this.img.pipeDown.width) {
	            this.x += (this.img.pipeDown.width + this.LRSpace) * Pipe.len;
	            this.initY();
	        }
	    }
	}

	return Pipe;
});


