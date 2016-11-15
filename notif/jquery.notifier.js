jQuery.fn.notifier = function(options){
	var elem = $(this);
	var options = $.extend({
		type: "error",
		message: "This is an error message!",
		time: 5000,
	}, options);

	this.each(function(){

		// init the style property
		var style='';

		// set background-color 
		if (options.type){
			switch(options.type){
				case 'warning':
					style +='background-color: yellow; color: black;';
					break;
				case 'success':
					style +='background-color: green; color: white;';
					break;
				default:
					style += '';
					break;

			}
		}

		$(this).append("<div class='notificationUnit' style='"+style+"'>" + options.message  + "</div>");
		
		setTimeout(function(){
			elem.html("");
			console.log('fired');
		}, options.time);

	});

	return this;
}