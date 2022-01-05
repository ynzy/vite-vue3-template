var i = 0;
var timer;
function timedCount() {
  i = i + 1;
  postMessage(i);
  timer = setTimeout(timedCount, 500);
  if (i > 1) {
    clearTimeout(timer);
  }
}

timedCount();
