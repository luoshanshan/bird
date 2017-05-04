define([], function() {
	/*
	* @基类
	* @param { options.ctx: Context } 绘图上下文
	* @param { options.img: Image } 背景图
	* @param { options.speed: speed } 速度
	* */
	function RoleBase(options) {
	    this.ctx = options.ctx;
	    this.img = options.img;
	    this.speed = options.speed || 2;
	    this.width = this.img.width;
	    this.height = this.img.height;
	}
	
	RoleBase.prototype = {
	
	    // 根据实例的属性值绘制
	    draw: function() {
	        this.ctx.drawImage(this.img, this.x, this.y);
	    },
	
	    /*
	    * @更新下一帧绘制数据
	    * @param { len: number } 该种类型角色的数量
	    * */
	    update: function(len) {
	        this.x -= this.speed;
	
	        // 走出画布，向右拼接
	        if(this.x < -this.width) {
	            this.x += this.width * len;
	        }
	    }
	}
	
	return RoleBase;
});

