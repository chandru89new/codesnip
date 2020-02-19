var formatTime = seconds => {
  var h, m, s;
  if (seconds < 60) {
    s = seconds;
    return {
      hours: 0,
      minutes: 0,
      seconds: s
    };
  }
  if (seconds > 60 && seconds < 3600) {
    m = Math.floor(seconds / 60);
    s = seconds - m * 60;
    return {
      hours: 0,
      minutes: m,
      seconds: s
    };
  }
  if (seconds > 3600) {
    h = Math.floor(seconds / 3600);
    remainingSeconds = seconds - h * 3600;
    m = Math.floor(remainingSeconds / 60);
    s = remainingSeconds - m * 60;
    return {
      hours: h,
      minutes: m,
      seconds: s
    };
  }
};
