define([], function() {
	function Timer() {

	}
	
	Timer.prototype = {
	    draw: function() {
	        console.log('绘制计时器');
	    },
	
	    update: function() {
	        console.log('更新计时器');
	    }
	}
	
	return Timer;
});
