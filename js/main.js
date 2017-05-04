requirejs.config({
	baseUrl: './',
	paths: {
		FlappyBird: 'js/flappy_bird',
		E: 'js/lib/e',
		ImgLoad: 'js/lib/imgLoad',
		util: 'js/lib/util',
		Bird: 'js/roles/bird',
		Land: 'js/roles/land',
		Pipe: 'js/roles/pipe',
		RoleBase: 'js/roles/role_base',
		Sky: 'js/roles/sky',
		Timer: 'js/roles/timer',
	}
});

require(['FlappyBird'], function(FlappyBird) {
	var flaB = new FlappyBird('body');
    flaB.run();
});
