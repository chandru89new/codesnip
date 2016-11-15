document.addEventListener('touchmove', function(e) { 
    e.preventDefault(); 
});

var section = document.getElementsByClassName("scrollSection"); // this is the div/section that is scrollable
var sectionHeight = section[0].getBoundingClientRect().height;

var targetY = 0;

VirtualScroll.on(function(e){
	targetY += e.deltaY;
	targetY = Math.max((sectionHeight + 100 - window.innerHeight)*-1, targetY);
	targetY = Math.min(0, targetY);
	var t = "translate3d(0px, "+targetY+"px, 0px)";
	
	var s = section[0].style;
	s["transform"] = t;
	s["webkitTransform"] = t;
	s["mozTransform"] = t;
	s["msTransform"] = t;
})


