var scrollMargin = 50;

var rows = new Array();

var CRow = function(element, top){
  this.top = top;
  this.element = element;
}

function fixedScroll(){
  var pos = window.scrollY;
  rows.forEach(function(row){
    if(pos < row.top - scrollMargin){
      window.location = Config.basePath + "#" + $(row.element).attr("id");
    }
  })

}

$(function(){
  var rowElements = document.getElementsByClassName("row");
  var currentHeight = 0;
  if(rowElements.length > 0){
    for(var i = 0; i < rowElements.length; i++){
      rows.push(new CRow(rowElements[i], currentHeight));
      currentHeight += $(rowElements[i]).height();
    }
  }

  window.onscroll = fixedScroll;

  console.log(rows);

});
