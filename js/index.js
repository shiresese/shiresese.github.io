var EVector = {
  LEFT: -1,
  RIGHT: 1
};
var EPage = {
  SHIRE: 0,
  SRSS: 1,
  SESE: 2
};
var PageName = ["shire", "srss", "sese"];


var currentPage;

function changeHash(direction) {
  var next = currentPage + direction;
  if(next < 0) {
    next = EPage.SESE;
  } else if(next > 2) {
    next = EPage.SHIRE;
  }

  window.location.hash = PageName[next];
  currentPage = next;

}

function initPos(){
  console.log("unload");
  if(window.location.hash === "") {
    currentPage = EPage.SRSS;
    window.scrollTo($("#shire").width(), 0);
  } else {
    if(window.location.hash === "#shire") {
      currentPage = EPage.SHIRE;
      window.scrollTo(0, 0);
    } else if(window.location.hash === "#sese") {
      currentPage = EPage.SESE;
      window.scrollTo($("#shire").width() + $("#srss").width(), 0);
    }
  }
}

function easeInCubic(flame, end, time){
  flame /= time;
	return end*flame*flame*flame;
}

function animateMove(moveX, moveY, startX, startY, numOfFlame, flame, time){
  console.log(moveX, moveY, startX, startY, numOfFlame, flame, time);
  window.scrollTo(startX + easeInCubic(flame, moveX, numOfFlame), startY + easeInCubic(flame, moveY, numOfFlame));
  if(numOfFlame > flame){
    window.setTimeout(
      "animateMove(" + moveX + "," + moveY + "," + startX + "," + startY + "," + numOfFlame + "," + (++flame) + "," + time + ")",
      time
      );
  }
}

function smoothScroll(endX, endY, time){
  if(!time){
    time = 500;
  }
  var startX = window.scrollX;
  var startY = window.scrollY;
  var moveX = endX - startX;
  var moveY = endY - startY;
  var spf = 10;
  var numOfFlame = time / spf;
  animateMove(moveX, moveY, startX, startY, numOfFlame, 0, spf);
}

function movePage(vec){
  switch(currentPage){
    case EPage.SRSS:
      switch (vec) {
        case EVector.LEFT:
          smoothScroll(0, 0);
          //window.location.hash = "#shire";
          currentPage = EPage.SHIRE;
          break;
        case EVector.RIGHT:
          smoothScroll($("#shire").width() + $("#srss").width(), 0);
          //window.location.hash = "#sese";
          currentPage = EPage.SHIRE;
          break;
      }
      break;
    case EPage.SHIRE:
      switch (vec) {
        case EVector.LEFT:
          smoothScroll($("#shire").width() + $("#srss").width(), 0);
          //window.location.hash = "#sese";
          currentPage = EPage.SESE;
          break;
        case EVector.RIGHT:
          smoothScroll($("#shire").width(), 0);
          //window.location.hash = "";
          currentPage = EPage.SRSS;
          break;
      }
      break;
    case EPage.SESE:
      switch (vec) {
        case EVector.LEFT:
          smoothScroll($("#shire").width(), 0);
          //window.location.hash = "";
          currentPage = EPage.SRSS;
          break;
        case EVector.RIGHT:
          smoothScroll(0, 0);
          //window.location.hash = "#shire";
          currentPage = EPage.SHIRE;
          break;
      }
      break;
  }
}

$(function(){
  //Event binding
  var scrollStopEvent = new $.Event("scrollstop");
  var delay = 200;
  var timer;
  function scrollStopEventTrigger(){
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function(){$(window).trigger(scrollStopEvent)}, delay);
  }
  $(window).on("scroll", scrollStopEventTrigger);
  $("body").on("touchmove", scrollStopEventTrigger);
  $(window).on("resize", initPos);

  $(window).on("unload", initPos);
  $(window).on("scrollstop", function(){
  });

  $(".arrow").on("click", function(){
    switch ($(this).attr("id")){
      case "left-arrow":
        movePage(EVector.LEFT);
        break;
      case "right-arrow":
        movePage(EVector.RIGHT);
        break;
    }
  });

  //Event binding end

  initPos();

});
