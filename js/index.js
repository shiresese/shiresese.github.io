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

var currentPage = 1;

function changeHash(direction) {
  var next = currentPage + direction;
  if(next < 0) {
    next = EPage.SESE;
  } else if(next > 2) {
    next = EPage.SHIRE;
  }
  var event = new $.Event('changehash', {before: currentPage, after: next, direction: direction});
  window.location.hash = PageName[next];
  currentPage = next;
  $(window).trigger(event);
}

function initPos(){
  console.log("unload");
  if(window.location.hash === "") {
    currentPage = EPage.SRSS;
    window.scrollTo($("#shire-s").width(), 0);
  } else {
    if(window.location.hash === "#shire") {
      currentPage = EPage.SHIRE;
      window.scrollTo(0, 0);
    } else if(window.location.hash === "#sese") {
      currentPage = EPage.SESE;
      $("#sese-s").addClass("noscroll");
      window.scrollTo($("#shire-s").width() + $("#srss-s").width(), 0);
    }
  }
}

function easeInCubic(flame, end, time){
  flame /= time;
	return end*flame*flame*flame;
}

function animateMove(moveX, moveY, startX, startY, numOfFlame, flame, time){
  //console.log(moveX, moveY, startX, startY, numOfFlame, flame, time);
  window.scrollTo(startX + easeInCubic(flame, moveX, numOfFlame), startY + easeInCubic(flame, moveY, numOfFlame));
  if(numOfFlame > flame){
    window.setTimeout(
      function() {
        animateMove(moveX, moveY, startX, startY, numOfFlame, (++flame), time);
      }, time);
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
          currentPage = EPage.SHIRE;
          break;
        case EVector.RIGHT:
          smoothScroll($("#shire").width() + $("#srss").width(), 0);
          currentPage = EPage.SHIRE;
          break;
      }
      break;
    case EPage.SHIRE:
      switch (vec) {
        case EVector.LEFT:
          smoothScroll($("#shire").width() + $("#srss").width(), 0);
          currentPage = EPage.SESE;
          break;
        case EVector.RIGHT:
          smoothScroll($("#shire").width(), 0);
          currentPage = EPage.SRSS;
          break;
      }
      break;
    case EPage.SESE:
      switch (vec) {
        case EVector.LEFT:
          smoothScroll($("#shire").width(), 0);
          currentPage = EPage.SRSS;
          break;
        case EVector.RIGHT:
          smoothScroll(0, 0);
          currentPage = EPage.SHIRE;
          break;
      }
      break;
  }
}
var moveMargin = 50;
function checkScroll(){
  var x = window.scrollX;
  var colWidth = $("#shire-s").width();
  if(moveMargin < x && x < colWidth - moveMargin * 2){
    changeHash(EVector.RIGHT);
  } else if(colWidth - moveMargin * 2 < x && x < colWidth - moveMargin){
    changeHash(EVector.LEFT);
  } else if(colWidth + moveMargin < x && x < colWidth * 1.5){
    changeHash(EVector.RIGHT);
  } else if(colWidth * 1.5 < x && x < colWidth * 2 - moveMargin){
    changeHash(EVector.LEFT);
  }
  console.log(x, colWidth);
}

function smoothScrollTo(page) {
  switch (page) {
    case EPage.SHIRE:
      smoothScroll(0 ,0);
      break;
    case EPage.SRSS:
      smoothScroll($("#shire-s").width() ,0);
      break;
    case EPage.SESE:
      smoothScroll($("#shire-s").width() + $("#srss-s").width() ,0);
      break;
  }
}

var changeHashCallback = function(e) {
  console.log(e);
  smoothScrollTo(e.after);
  $("#sese-s").removeClass("noscroll");
  if(e.after === EPage.SESE) {
    setTimeout(function(){
      if(window.location.hash==="#sese")
      $("#sese-s").addClass("noscroll");
    }, 1000);
  }
};

$(function(){
  //Event binding
  var scrollStopEvent = new $.Event("scrollstop");
  var delay = 100;
  var timer;
  function scrollStopEventTrigger(e){
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function(){$(window).trigger(scrollStopEvent)}, delay);
  }
  $(window).on("scroll", scrollStopEventTrigger);
  $("body").on("touchmove", scrollStopEventTrigger);

  $(window).on("resize", initPos);

  $(window).on("unload", initPos);
  $(window).on("scrollstop", checkScroll);

  $(window).on("changehash", changeHashCallback);

  $(".arrow").on("click", function(){
    switch ($(this).attr("id")){
      case "left-arrow":
        changeHash(EVector.LEFT);
        break;
      case "right-arrow":
        changeHash(EVector.RIGHT);
        break;
    }
  });

  //Event binding end

  initPos();

});
