function rowTemplate(){
    // background-color:{_color}66;
    return  "<div class='row navigation-row' onclick='getDetail(" + wrapQuotes('{Code}') + ")'>" +
                "<div class='col-2 isStandardIndicator-{_isStandardIndicator}'" +
                "style='font-size:20px; font-weight: 600;'> {Code}" +                     
                "</div>" + 
                "<div class='col-10 indicator-card hvr-grow' style='border-left: 8px solid {_color};'>" +
                    "<b style='font-weight:600;'>{Indicator}</b>" +
                    "<br><hr><b style='font-weight:600;'>Description: </b>{Description}" +
                "</div>" +       
            "</div>";
        }
     
function noRecordsTemplate(){
    return "<center>" + 
                "<p  class='text'>sorry, no indicators match your search!</p>" +
                "<hr style='width:600px;'>" +
                "<button  type='button' class='btn btn-outline-secondary ' onclick='clearFilters()'>clear filter</button>" +
            "</center>";
}
        
function headerTemplate(){
    return "<div class='row navigation-headers'>" + 
                "<div " + getOrderEvent('Code') + " class='navigation-header col-2'>Code</div>" +
                "<div " + getOrderEvent('Indicator') + " class='navigation-header col-10'>Indicator</div>" +
            "</div>";
}   

function detailPropertyTemplate(attr, val){
    return "<div class='row detailRow'>" + 
           "<div class='col-3 detailAttribute'>" + attr + "</div>" +
           "<div class='col-9 detailValue'>" + val + "</div>" +
            "</div>";
}

function hexAToRGBA(h) {
    var r = 0, g = 0, b = 0, a = 1;
    console.log(h);
    if (h.length == 5) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
      a = "0x" + h[4] + h[4];
  
    } else if (h.length == 9) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
      a = "0x" + h[7] + h[8];
    }
    a = +(a / 255).toFixed(3);
    return "rgba(" + +r + "," + +g + "," + +b + "," + a + ")";
  }

  function RGBToHex(r,g,b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

  function setOpaque(rgb){
    console.log(rgb);
    var hex = RGBToHex(rgb);
    return hexAToRGBA(rgb  + "66");
  }

  function setBackgroundColorsOpaque(){
      $(".indicator-card").each(function(){
          console.log($(this));
          var color = $(this).css("border-color");
          $(this).css('background-color', setOpaque(color));
      });
  }