$(document).ready(function() {
  var getTumblrPosts, openLink, openLinkNewTab;
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
  getTumblrPosts = function(tag, callback) {
    var api_key, domain, option;
    domain = "side-se.tumblr.com";
    api_key = "1FLh5aV3GU5wC1ofWdUqxhcX5XkNDLjLh66XypGvSvkErzCwhH";
    option = [];
    option.push("tag=" + tag);
    option.push("limit=3");
    option = "&" + option.join("&");
    return $.ajax({
      url: "http://api.tumblr.com/v2/blog/" + domain + "/posts?api_key=" + api_key + option,
      dataType: "jsonp"
    }).done(function(e, e2) {
      return callback(e.response.posts);
    });
  };
  getTumblrPosts("info", (function(_this) {
    return function(posts) {
      var post;
      post = posts[0];
      $(".sese-latest-info-title").text(post.title);
      $(".sese-latest-info-body").html(post.body);
      return console.log(posts);
    };
  })(this));
  $(".shire-name").click(openLink("./shire"));
  $(".shire-latest-info").click(openLink("./shire#news"));
  $(".sese-name").click(openLink("./sese"));
  return $(".sese-latest-info").click(openLink("./sese#info"));
});

window.onpageshow = function(event) {
  if (event.persisted) {
    return $("#cover").fadeOut(500);
  }
};
