define(['util', 'Bird', 'Land', 'Pipe', 'Sky', 'Timer', 'ImgLoad'], function(util, Bird, Land, Pipe, Sky, Timer, ImgLoad) {
	/*
	* 该对象负责直接调度几个角色对象，并提供如下几个方法：
	*
	* run: 对外开发的游戏开始方法
	*
	* draw: 绘制游戏画面
	*
	* start: 开始运行游戏
	*
	* end: 结束游戏
	*
	* pause：暂停继续游戏
	*
	* restart: 重新开始游戏
	*
	* */
	
	/*
	* @constructor { Function }  游戏主对象
	* @param { container: string } 容器选择器
	* */
	function FlappyBird(container) {
	    /*
	    * 1、调用util里的getCtx方法，动态创建画布与绘制上下文
	    * 2、利用imgLoad对象加载游戏所需的图像资源
	    * 3、当图像资源加载完毕后，创建所有的角色对象
	    * 4、创建好之后，就可以start了。
	    * */
	    this.ctx = util.getCtx(1300, 600, container);
	    this.isPause = false;
	    this.bind();
	}
	
	FlappyBird.prototype = {
	
	    // 对外开发的游戏开始方法
	    run: function() {
	        var self = this;
	        new ImgLoad({
	            bird: './imgs/bird.png',
	            land: './imgs/land.png',
	            pipeDown: './imgs/pipe_down.png',
	            pipeUp: './imgs/pipe_up.png',
	            sky: './imgs/sky.png'
	        }).load().on('imgAllLoaded', function(imgs) {
	            self.initRoles(imgs);
	            self.start();
	        });
	    },
	
	    /*
	    * @根据角色占用宽度计算轮播时需要的数量
	    * @param { width: Number } 角色占用宽度
	    * @return 所需个数
	    * */
	    getRoleNumber: function(width) {
	        return Math.ceil(this.ctx.canvas.width / width) + 1;
	    },
	
	    /*
	    * @创建游戏所需的角色
	    * @param { imgs: Object } 所有已加载完毕的图像资源
	    * */
	    initRoles: function(imgs) {
	        var tempTotle = 0, i;
	
	        this.roles = {
	            sky: [],
	            pipe: [],
	            land: [],
	            bird: [],
	            timer: []
	        };
	
	        // 鸟
	        this.roles.bird.push(new Bird({
	            ctx: this.ctx,
	            img: imgs.bird,
	            widthFrame: 3
	        }));
	
	        // 计算所需大地数量，然后创建
	        tempTotle = this.getRoleNumber(imgs.land.width);
	        for(i = 0; i < tempTotle; i++) {
	            this.roles.land.push(new Land({
	                ctx: this.ctx,
	                img: imgs.land
	            }));
	        }
	
	        // 计算所需管道数量，然后创建
	        tempTotle = this.getRoleNumber(imgs.pipeDown.width + 120);
	        for(i = 0; i < tempTotle; i++) {
	            this.roles.pipe.push(new Pipe({
	                ctx: this.ctx,
	                img: {
	                    pipeDown: imgs.pipeDown,
	                    pipeUp: imgs.pipeUp
	                },
	                LRSpace: 120
	            }));
	        }
	
	        // 计算所需背景数量，然后创建
	        tempTotle = this.getRoleNumber(imgs.sky.width);
	        for(i = 0; i < tempTotle; i++) {
	            this.roles.sky.push(new Sky({
	                ctx: this.ctx,
	                img: imgs.sky
	            }));
	        }
	
	        // 计时器
	        this.roles.timer.push(new Timer({
	            ctx: this.ctx
	        }));
	    },
	
	    // 绘制游戏画面
	    _draw: function() {
	        /*
	        * 绘制所有的角色：
	        * 1、遍历this.roles，取出每一种角色数组
	        * 2、在遍历每一种角色数组，得到单个角色对象，调用其draw方法进行绘制
	        * */
	        var key;
	        for(key in this.roles) {
	            this.roles[key].forEach(function(role) {
	                role.draw();
	            });
	        }
	    },
	
	    // 绘制游戏画面
	    draw: function() {
	        /*
	        * 1、开启定时器
	        * 2、清除当前游戏画面
	        * 3、遍历得到所有的角色依次更新数据与绘制
	        * 3.1、遍历this.roles，取出每一种角色数组
	        * 3.2、在遍历每一种角色数组，得到单个角色对象
	        * 3.3、调用其update方法更新数据，调用draw方法进行绘制
	        * */
	        var key, self = this;
	        setInterval(function() {
	
	            // 没有暂停才进行角色绘制
	            if(!self.isPause) {
	
	                // 清除路径与画布
	                self.ctx.beginPath();
	                self.ctx.clearRect(0, 0, self.ctx.canvas.width, self.ctx.canvas.height);
	
	                // 绘制角色
	                for(key in self.roles) {
	                    self.roles[key].forEach(function(role) {
	                        role.update(role.constructor.len);
	                        role.draw();
	                    });
	                }
	
	                // 每次绘制完毕，检测一下小鸟有没有死亡，死亡则结束游戏
	                if(self.isDie()) {
	                    self.end();
	                }
	            }
	
	        }, 1000 / 60);
	    },
	
	    // 检测一下小鸟有没有死亡
	    isDie: function() {
	        var bird = this.roles.bird[0];
	        var birdCoreX = bird.x + bird.width / 2;
	        var birdCoreY = bird.y + bird.height / 2;
	
	        // 鸟飞出去，撞大地，撞管子，都会死
	        if(
	            birdCoreY < 0
	            || birdCoreY > (this.ctx.canvas.height - this.roles.land[0].height)
	            || this.ctx.isPointInPath(birdCoreX, birdCoreY)
	        ){
	            return true;
	        }
	
	        return false;
	    },
	
	    // 开始游戏
	    start: function() {
	        this.draw();
	    },
	
	    // 暂停或继续游戏
	    pause: function() {
	        this.isPause = !this.isPause
	    },
	
	    // 结束游戏
	    end: function() {
	        this.isPause = true;
	    },
	
	    // 重新开始
	    restart: function() {
	        window.location.reload();
	    },
	
	    // 事件绑定
	    bind: function() {
	        var self = this;
	        this.ctx.canvas.addEventListener('click', function() {
	            self.roles.bird[0].flyup();
	        });
	    }
	}
	
	return FlappyBird;
});
