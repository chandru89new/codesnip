if (document.addEventListener) {
    document.addEventListener("mousewheel", MouseWheelHandler(), false);
    document.addEventListener("DOMMouseScroll", MouseWheelHandler(), false);
} else {
    sq.attachEvent("onmousewheel", MouseWheelHandler());
}


function MouseWheelHandler() {
    return function (e) {
        // cross-browser wheel delta
        var e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        //scrolling down?
        // if (delta < 0) {
        //     alert("Down");
        // }

        // //scrolling up?
        // else {
        //      alert("Up");
        // }
        // return false;

        console.log(e.deltaY);
    }
}