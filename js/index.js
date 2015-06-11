
var currentPage = "srss";

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

  window.scrollTo($(".shire").width(), 0);

  $(window).on("scrollstop", function(){

  });

});
