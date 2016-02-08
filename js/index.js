$(function() {
  var openLink, openLinkNewTab;
  $("#cover").fadeOut(500);
  openLink = function(link) {
    return function(e) {
      if (e.metaKey) {
        return window.open(link);
      } else {
        return $("#cover").fadeIn(500, function() {
          return window.location.href = link;
        });
      }
    };
  };
  openLinkNewTab = function(link) {
    return function() {
      return window.open(link);
    };
  };
  $(".shire-name").click(openLink("./shire"));
  $(".shire-latest-info").click(openLink("./shire#news"));
  $(".sese-name").click(openLink("./sese"));
  return $(".sese-latest-info").click(openLink("./sese#info"));
});

$(window).unload(function() {});
