
var currentPage = "srss";

function initPos(){
  if(window.location.hash === "") {
    window.scrollTo($("#shire").width(), 0);
  } else {
    if(window.location.hash === "#shire") {
      window.scrollTo(0, 0);
    } else if(window.location.hash === "#sese") {
      window.scrollTo($("#shire").width() + $("#srss").width(), 0);
    }
  }
}

$(function(){
  var scrollStopEvent = new $.Event("scrollstop");
  var delay = 200;
  var timer;
  function scrollStopEventTrigger(){
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function(){$(window).trigger(scrollStopEvent)}, delay);
  }

  $(window).scroll(scrollStopEventTrigger);
  $("body").on("touchmove", scrollStopEventTrigger);
  document.addEventLister("unload", initPos);
  $(window).on("scrollstop", function(){

  });

});
