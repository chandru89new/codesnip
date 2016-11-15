jQuery.fn.heightFix = function(options){
	


	// set default options
	var options = $.extend({
		type: 'min', // what value to take? min height or max height?
		child: '.child', // which child to take up? if it's a class called 'child', then = '.child'
	}, options);

	// declare a variable elem so it's easy to refer to $(this)
	var elem = $(this);

	// init array for storing height values
	var heights = [];
	
	// max and min heights will be stored in these
	var max, min;

	// the final height value (max or min) will be stored in this
	var finalHeight;

	return this.each(function(){
		

		// first loop through all children
		elem.find(options.child).each(function(){
			height = $(this).height();
			heights.push(height);
		})

		// console.log(heights);

		max = Math.max.apply(null, heights);
		min = Math.min.apply(null, heights);

		// console.log(max, min);

		// the function that decides what value will be stored in finalHeight
		switch (options.type){
			case 'max':
				finalHeight = max;
				break;
			default:
				finalHeight = min;
				break;
		}

		console.log(finalHeight);

		// now we have max/min value. apply it for all children
		elem.find(options.child).each(function(){
			$(this).height(finalHeight);
		});


	});


}