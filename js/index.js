
var currentPage = "srss";

$(function(){
  var scrollStopEvent = new $.Event("scrollstop");
  var delay = 200;
  var timer;
  function scrollStopEventTrigger(){
    console.log(window.scrollX);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function(){$(window).trigger(scrollStopEvent)}, delay);
  }

  $(window).scroll(scrollStopEventTrigger);
  $("body").on("touchmove", scrollStopEventTrigger);

  window.scrollTo(window.outerWidth, 0);

  $(window).on("scrollstop", function(){

  });

});
