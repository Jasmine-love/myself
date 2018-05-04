function font() {
  var oWidth = window.innerWidth;

  var font;
  if (oWidth > 768) {
      font=oWidth * 100 / 1920;
  } else {
      font=oWidth * 100 / 768;
  }
  if(font>100){
      font=100;
  }

  document.documentElement.style.fontSize = font + 'px';
}
font();
window.onresize = font;
